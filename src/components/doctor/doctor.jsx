import React from 'react'

function Doctor(props) {
    return (
        <tr>
          <td>{props.name}</td>
          <td>{props.specialty}</td>
          <td className="text-end">
            <div className="d-inline me-2">
              <button onClick={() => props.clickEdit(props.id_doctor)} className="btn btn-sm btn-primary"><i className="bi bi-pencil-square"></i></button>
            </div>
            
              <button onClick={() => props.clickDelete(props.id_doctor)} className="btn btn-sm btn-danger"><i className="bi bi-trash3"></i></button>
           
          </td>
        </tr>
      );
}

export default Doctor
