import { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import ComboBox from "../../components/ComboBox";
import AuthContext from "../../context/authContext";
import ClientContext from "../../context/clientContext";
import { sendMail } from "../../services/mailService";
import { consultQuotes, verifyConect , verifyConect2 } from "../../services/coinMarketService"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import TableRecords from "../../components/TablaCoinMarkerCap";
import "./styles.css";

export default function Form() {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState();
  const [search, setSearch] = useState("");
  const COLORS = ["#0088FE","#00C49F","#FFBB28","#FF8042","#845EC2","#D65DB1","#FF6F91","#FFC75F","#2C73D2","#F9F871"];

  const handleVerify = (e) => {
    e.preventDefault();
    verifyConect()
    .then((data)=>{
      setRes(data.data)
    })
  }

  const fetchData = async () => {
    try {
      const responde = await verifyConect();
      setRes(responde.data); // usamos lo que enviamos desde el backend
    } catch (err) {
      alert(err)
      console.error("Error:", err.message);
    }
  };

  useEffect(() => {
    fetchData();

    // Actualización automática cada 60s
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div
      className="container d-flex flex-column w-100"
      style={{ fontSize: 10.5 }}
    >
      <h1 className="text-center fs-5 fw-bold">CryptoInvestment</h1>
      <form className="" >
        <div
          className="d-flex w-100 flex-column mt-2"
        >
          <h4>Criptomonedas</h4>
          <TableRecords
            records={res}
          />
          {/* <table border="1">
            <thead
              
            >
              <tr
                className="fw-bold"
                style={{
                  backgroundColor:'whitesmoke'
                }}
              >
                <th>Rank</th>
                <th>Nombre</th>
                <th>Símbolo</th>
                <th>Precio (USD)</th>
                <th>% 24h</th>
                <th>Volumen</th>
              </tr>
            </thead>
            <tbody>
              {res?.map(coin => (
                <tr key={coin.id}>
                  <td>{coin.rank}</td>
                  <td>{coin.name}</td>
                  <td>{coin.symbol}</td>
                  <td>${coin.price.toFixed(2)}</td>
                  <td style={{ color: coin.percent_change_24h > 0 ? "green" : "red" }}>
                    {coin.percent_change_24h.toFixed(2)}%
                  </td>
                  <td>{coin.volume_24h.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <div className="row row-cols-sm-2">
            <div style={{ height: 500 }} className="mt-4 mb-2">
              <h4 className="text-xl font-bold">Volumen por Criptomoneda</h4>
              <ResponsiveContainer>
                <BarChart data={res}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="volume_24h">
                    {res?.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ height: 500 }} className="mt-4 mb-2">
              <h4 className="text-xl font-bold">Distribución del Volumen</h4>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={res}
                    dataKey="volume_24h"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label
                  >
                    {res?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <Modal show={loading} centered>
          <Modal.Body>
            <div className="d-flex align-items-center">
              <strong className="text-danger" role="status">
                Cargando...
              </strong>
              <div
                className="spinner-grow text-danger ms-auto"
                role="status"
              ></div>
            </div>
          </Modal.Body>
        </Modal>
      </form>
    </div>
  );
}
