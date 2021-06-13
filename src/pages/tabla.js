import React from 'react';

import MaterialTable from "material-table";
import jsPDF from 'jspdf'


const columns= [
    {
      title: "Fecha",
      field: "c_id",
      hidden: true
     
    },
    {
      title: "Fecha",
      field: "fecha",
      type: "date"
      
      
    },
    {
      title: "Hora",
      field: "hora"
  
     
    },
    {
      title: "invitado #1",
      field: "c_in1"
     
      
    },
    {
      title: "invitado #2",
      field: "c_in2"
     
     
    },
    {
      title: "invitado #3",
      field: "c_in3"
      
    },
    {
      title: "invitado #3",
      field: "u_id",
      hidden: true
    }
  ]

const Tabla = ({data}) => {
const generatePDF = () => {
      var doc = new jsPDF('p', 'pt');
      
      doc.text(20, 20, 'This is the first title.')

      doc.addFont('helvetica', 'normal')
      doc.text(20, 60, 'fdhdf')
      doc.text(20, 100, 'This is the thrid title.')      

      
      doc.save('demo.pdf')
    }   
  /*valor.map((val, index) => {
    da.rows.push({
      fecha: val.fecha,
      hora: val.hora,
      invitado1: val.c_in1,
      invitado2: val.c_in2,
      invitado3: val.c_in3,
      uid: val.u_id,
      action: (<div>
        <button className="btn-success" onClick={() => {
          console.log(val.fecha)
        }}> ver </button>
      </div>)
    }

    )
    return val;
  }
  );*/

  return (
    <div className="container">
      <MaterialTable
          columns={columns}
          data={data}
          title="Citas"  
          actions={[
            {
            size: 'small',
            tooltip: 'Edit',
            icon: 'edit',
              onClick: (event, rowData) => alert( rowData.fecha+" "+rowData.hora)
             
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar ',
              onClick: (event, rowData) =>
            {
               generatePDF()
            }
          
              
            }
          ]}
          options={{

            actionsColumnIndex: -1,
          }}
          localization={{
            header:{
              actions: "Acciones"
            },
              toolbar: {
           searchTooltip: 'Buscar',
          searchPlaceholder: 'Buscar'
        }
      
          }}

        />
    </div>
  );
}
export default Tabla;
