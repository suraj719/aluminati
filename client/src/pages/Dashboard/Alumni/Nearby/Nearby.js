import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import Supercluster from "supercluster";
import Geocoder from "./Geocoder";
import "mapbox-gl/dist/mapbox-gl.css";

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

const ConnectionsWithMap = () => {
  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [batchmates, setBatchmates] = useState([]);
  const [filteredBatchmates, setFilteredBatchmates] = useState([]);
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const [popupInfo, setPopupInfo] = useState(null);
  const mapRef = useRef();
  const fetchBatchmates = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/alumni/get-all-alumni`,
        {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1]
            }`,
          },
        }
      );
      if (response.data.success) {
        const data = response.data.data;

        const uniqueBranches = [
          ...new Set(data.map((item) => item.major).filter(Boolean)),
        ];
        const uniqueYears = [
          ...new Set(data.map((item) => item.graduationYear).filter(Boolean)),
        ];

        setBatchmates(data);
        setBranches(uniqueBranches);
        setYears(uniqueYears);
        setFilteredBatchmates(data);

        const pointsData = data.map((batchmate) => ({
          type: "Feature",
          properties: {
            cluster: false,
            id: batchmate._id,
            name: `${batchmate.firstName} ${batchmate.lastName}`,
            major: batchmate.major,
            graduationYear: batchmate.graduationYear,
            profilePicture: batchmate.profilePicture || "/images/defppic.jpg",
          },
          geometry: {
            type: "Point",
            coordinates: [
              parseFloat(batchmate.location.longitude),
              parseFloat(batchmate.location.latitude),
            ],
          },
        }));

        setPoints(pointsData);
      } else {
        toast.error("Failed to fetch alumni data.");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching alumni data.");
    }
  };

  const applyFilters = () => {
    const filtered = batchmates.filter((batchmate) => {
      const matchesSearch = `${batchmate.firstName} ${batchmate.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesBranch =
        selectedBranch === "" || batchmate.major === selectedBranch;
      const matchesYear =
        selectedYear === "" ||
        batchmate.graduationYear === Number(selectedYear);
      return matchesSearch && matchesBranch && matchesYear;
    });

    setFilteredBatchmates(filtered);

    // Regenerate points for the map
    const filteredPoints = filtered.map((batchmate) => ({
      type: "Feature",
      properties: {
        cluster: false,
        id: batchmate._id,
        name: `${batchmate.firstName} ${batchmate.lastName}`,
        major: batchmate.major,
        graduationYear: batchmate.graduationYear,
        profilePicture: batchmate.profilePicture || "/images/defppic.jpg",
      },
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(batchmate.location.longitude),
          parseFloat(batchmate.location.latitude),
        ],
      },
    }));

    setPoints(filteredPoints); // Update points to reflect the filtered data
  };

  useEffect(() => {
    fetchBatchmates();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, selectedBranch, selectedYear]);

  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef?.current) {
      setBounds(mapRef?.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);

  return (
    <div className="bg-gray-900 max-h-screen px-8 py-0 text-white">
      <h1 className="text-3xl font-bold mb-6">Find Nearby Alumni</h1>
      <div className="bg-gray-800 p-4 rounded-lg mb-3">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 bg-gray-700 text-white rounded-md outline-none focus:bg-gray-600"
          />
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="flex-1 p-2 bg-gray-700 text-white rounded-md outline-none focus:bg-gray-600"
          >
            <option value="">All Branches</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="flex-1 p-2 bg-gray-700 text-white rounded-md outline-none focus:bg-gray-600"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-[60vh] rounded-lg">
        <ReactMapGL
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          ref={mapRef}
          onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
        >
          <Geocoder />
          {clusters.map((cluster) => {
            const { cluster: isCluster, point_count } = cluster.properties;
            const [longitude, latitude] = cluster.geometry.coordinates;
            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  longitude={longitude}
                  latitude={latitude}
                >
                  <div
                    className="cluster-marker bg-blue-500 text-white rounded-full w-6 h-6"
                    onClick={() => {
                      const zoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef.current.flyTo({
                        center: [longitude, latitude],
                        zoom,
                        speed: 1.5,
                      });
                    }}
                  >
                    {point_count}
                  </div>
                </Marker>
              );
            }
            return (
              <Marker
                key={`batchmate-${cluster.properties.id}`}
                longitude={longitude}
                latitude={latitude}
              >
                <img
                  src="/images/location-pin.png"
                  alt="Location Pin"
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => setPopupInfo(cluster)}
                />
              </Marker>
            );
          })}
          {popupInfo && (
            <Popup
              longitude={popupInfo?.geometry?.coordinates[0]}
              latitude={popupInfo?.geometry?.coordinates[1]}
              closeOnClick={false}
              onClose={() => setPopupInfo(null)}
            >
              <div className="bg-gray-900 p-4 rounded-lg">
                <img
                  src={popupInfo.properties?.profilePicture}
                  alt="Profile"
                  className="w-16 h-16 rounded-full mb-2 object-cover"
                />
                <Link to={`/dashboard/profile/${popupInfo?.properties?.id}`}>
                  <p className="hover:underline">
                    <strong>{popupInfo.properties?.name}</strong>
                  </p>
                </Link>
                <p>{popupInfo.properties?.major}</p>
                <p>Graduation Year: {popupInfo.properties?.graduationYear}</p>
              </div>
            </Popup>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default ConnectionsWithMap;
