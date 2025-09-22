import { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import AuthContext from "../../context/authContext";
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import { FaCheckCircle } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import Swal from "sweetalert2";
import "./styles.css";
import { FaEye } from "react-icons/fa";

function TableRecords({ records, getAllRecords, loading }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  //logica para saber si se esta visualizando en un celular
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900); // Establecer a true si la ventana es menor o igual a 768px
    };

    // Llama a handleResize al cargar y al cambiar el tamaño de la ventana
    window.addEventListener('resize', handleResize);
    handleResize(); // Llama a handleResize inicialmente para establecer el estado correcto

    // Elimina el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const columns = [
    {
      id: "rank",
      name: "Rank",
      center: true,
      selector: (row) => row?.rank,
      sortable: true,
      /* width: "130px", */
    },
    {
      id: "name",
      name: "Nombre",
      selector: (row) => row?.name,
      sortable: true,
      /* width: isMobile ? '100px':'100px' */
    },
    {
      id: "symbol",
      name: "Símbolo",
      selector: (row) => row?.symbol,
      sortable: true,
      /* width: isMobile ? '110px':'110px' */
    },
    {
      id: "price",
      name: 'Precio',
      selector: (row) => row?.price.toFixed(2),
      sortable: true,
      /* width: isMobile ? '190px':'160px' */
    },
    {
      id: "percent_change_24h",
      name: "Porcentaje de cambio",
      selector: (row) => `${row.percent_change_24h.toFixed(2)}%`,
      sortable: true,
      /* width: '190px' */
    },
    {
      id: "volume_24h",
      name: "volumen 24h",
      selector: (row) => row?.volume_24h.toLocaleString(),
      sortable: true,
      /* width: isMobile ? '190px':'160px' */
    },
    
  ];

  const customStyles = {
    /* cells: {
      style: {
        backgroundColor: row.status === 'en proceso' ?'rgba(255, 200, 39, 0.4)' : row.status === 'Finalizado' ? 'rgba(74, 157, 38, 0.35)' : 'grey', // ajustar el tamaño de la fuente de las celdas
      },
    }, */
    rows: {
      style: {
        height:'15px', // ajusta el alto de las filas según tus necesidades
        cursor:'pointer',
        
      },
    },
    headCells: {
      style: {
        fontSize: '14px',
        height:'35px',
        /* fontWeight:'bold', */
        color:'white',
        backgroundColor:'#145a83',
        /* borderRight: '1px solid black', */
        paddingLeft:10,
        paddingRight:10
      },
    },
    cells: {
      style: {
        /* borderRight: '1px solid black', */
        paddingLeft:10,
        paddingRight:10
      },
    },
    columns:{
      style: {
        borderLeft:'5px black solid'
      }
    }
  };

  const conditionalRowStyles = [
    {
      when: row => (row.status === 'En proceso'),
      style: {
        backgroundColor: 'rgba(255, 200, 39, 0.4)',
      },
    },
    {
      when: row => (row.status === 'Finalizado'),
      style: {
        backgroundColor: 'rgba(74, 157, 38, 0.35)',
      },
    },
    {
      when: row => (row.status === 'No realizado'),
      style: {
        backgroundColor: 'grey',
      },
    },
    {
      when: row => (row.news),
      style: {
        backgroundColor: '#98bffeff',
      },
    },
  ];

  return (
    <div
      className="d-flex flex-column rounded m-0 p-0 table-orders"
      style={{ height: "calc(100% - 140px)", width: "100%" }}
    >
      <DataTable
        className="bg-light text-center border border-2 h-100 p-0 m-0"
        columns={columns}
        data={records}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        fixedHeaderScrollHeight={200}
        progressPending={loading}
        progressComponent={
          <div class="d-flex align-items-center text-danger gap-2 mt-2">
            <strong>Cargando...</strong>
            <div
              class="spinner-border spinner-border-sm ms-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        }
        dense
        striped
        fixedHeader
        pagination
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página:",
          rangeSeparatorText: "de",
          selectAllRowsItem: false,
        }}
        paginationPerPage={50}
        paginationRowsPerPageOptions={[15, 25, 50, 100]}
        noDataComponent={
          <div style={{ padding: 24 }}>Ningún resultado encontrado.</div>
        }
      />
    </div>
  );
}

export default TableRecords;
