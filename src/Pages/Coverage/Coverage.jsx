// src/pages/CoverageLeaflet.jsx
import  { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// fix default icon issue in react-leaflet
import L from "leaflet";
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize:[25,41],
    iconAnchor:[12,41],
})

// ⭐ NEW — allows smooth zooming
function FlyToMarker({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 12, { duration: 1.5 });
    }
  }, [position]);
  return null;
}

const Coverage = () => {
  // Default center: Dhaka, Bangladesh (lat, lng)
  const center = [23.8103, 90.4125];
  const [districtData, setDistrictData] = useState([]);
   const [searchInput, setSearchInput] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
      fetch(`./warehouses.json`)
      .then((res) => res.json())
      .then((result) => {
        setDistrictData(result)
      })
  }, [])


  // ⭐ Handle search
  const handleSearch = () => {
    if (!searchInput.trim()) return;

    const term = searchInput.toLowerCase();

    // case-insensitive + partial match
    const matched = districtData.find((d) =>
      d.district.toLowerCase().includes(term)
    );

    if (matched) {
      setSelectedPosition([matched.latitude, matched.longitude]);
    } else {
      alert("District not found!");
    }
  };


  return (
    <div className="min-h-screen bg-base-200 text-base-content py-12 px-4 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl lg:text-5xl font-extrabold">We are available in 64 districts</h1>
          <p className="text-sm text-muted mt-2">Interactive coverage map — zoom, pan and click markers.</p>
        </header>

        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <input 
          className="input input-bordered input-secondary w-full sm:w-auto p-4 lg:p-2 flex-1"
        placeholder="Search district..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
          />

          <button 
          onClick={handleSearch}
          className="btn btn-primary text-secondary font-bold rounded-lg w-full sm:w-auto">Search</button>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg border border-base-300">
          <div className="w-full aspect-[16/9]">
            <MapContainer center={center} zoom={7} style={{ height: "100%", width: "100%" }}>
              {/* OpenStreetMap tiles */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

                {/* ⭐ Fly to searched district */}
              <FlyToMarker position={selectedPosition} />


              {/* new */}
                 {/* ⭐️ 2️⃣ --- MAP OVER DISTRICTS AND SHOW MARKERS --- */}
              {districtData.map((district, index) => (
                <Marker
                  key={index}
                  position={[district.latitude, district.longitude]}
                  icon={customIcon}
                >
                  <Popup>
                    <strong>{district.district}</strong> <br />
                    <span className="text-sm">{district.city}</span>
                    <hr />
                    <div className="text-xs text-gray-700">
                      <strong>Covered Areas:</strong>
                      <ul>
                        {district.covered_area.map((area, idx) => (
                          <li key={idx}>{area}</li>
                        ))}
                      </ul>
                    </div>
                  </Popup>
                </Marker>
              ))}



              {/* new ends */}





              {/* You can add more <Marker /> components here based on data */}
            </MapContainer>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted">
          Use this version when you need interactivity (markers, popups, clicking, clustering).
        </div>
      </div>
    </div>
  );
};

export default Coverage;
