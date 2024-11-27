import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'rsuite';
import {
  resetVendorsComponentFunc, resetVendorsFunc, updateVendorsFunc
} from '../../reducers/vendorsSlice';

// import 'rsuite/DateRangePicker/styles/index.css';

const VendorForm = ({ component, item, caughtDataOnClick }) => {
  // console.log('key, itemkiran', item, item.type);
  const dispatch = useDispatch();
  let setter = {};
  if (item.keyName) {
    setter = { [item.keyName]: item.value };
  } else if (item.fields && item.fields.length > 0) {
    for (let i = 0; i < item.fields.length; i++) {
      setter = { ...setter, [item.fields[i].keyName]: item.fields[i].value };
    }
  }
  const [value, setValue] = useState({ ...setter });
  // const [textAreaValue, setTextAreaValue] = useState({});

  const handleDatepickerChange = (value, keyName) => {
    if (value == null) {
      dispatch(updateVendorsFunc({ componentName: component, keyName, value: '' }));
    } else {
      const gD = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate();
      const gM = value.getMonth() + 1 < 10 ? `0${value.getMonth() + 1}` : value.getMonth() + 1;
      const date = `${gD}-${gM}-${value.getFullYear()}`;
      dispatch(updateVendorsFunc({ componentName: component, keyName, value: date }));
    }
  }

  const handleButtonClick = (event, keyName, id) => {
    caughtDataOnClick(keyName, id, value);
  }

  const handleInputChange = (event, keyName, type) => {
    console.log('event, keyName', event, keyName, type);

    let value = '';
    if (type === 'file') {
      value = event.target.files[0];
    } else if (type === 'checkbox') {
      value = event.target.checked;
    } else {      
      value = event.target.value;
    }

    if (type === 'file') {
      let fileEncoded = {};
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataURL = reader.result; // Base64 encoded file  
        fileEncoded = {
          fileName: value.name,
          fileType: value.type,
          dataURL,
        }
        dispatch(updateVendorsFunc({ componentName: component, keyName, value: fileEncoded }));
      };
      reader.readAsDataURL(value);
    } else {
      dispatch(updateVendorsFunc({ componentName: component, keyName, value }));
      // setValue(value);
      setValue((prevValues) => ({
        ...prevValues,
        [keyName]: value
      }));
    }
  };

  const RenderLabel = ({ htmlFor, label }) => {
    return (
      <label htmlFor={htmlFor} className="form-label">{label}</label>
    );
  }

  const ButtonIcon = ({ id, classs, index, keyName, icon, label }) => {
    return (
      <a id={id} href="#!" className={`btn btn-${classs[0][0]} btn-sm`} key={`${index}-${id}`} onClick={(e) => handleButtonClick(e, keyName)}><i className={`bi ${icon}`}></i>{label}</a>
    );
  }

  const renderField = () => {
    switch (item.htmlType) {
      case 1:
        return (
          <div key={item.id} id={item.id} className={item.class[0].join(' ')}>
            <item.type className={item.class[1].join(' ')}>{item.label}</item.type>
          </div>
        );
      case 2:
        return (
          <div className="col-auto">
            {
              Array.isArray(item.entity) && item.entity.length > 0 && item.entity.map((ent, index) => {
                return (<a id={ent.id} href="#!" className={`btn btn-${ent.class[0][0]} btn-sm ${ent.class[0][1]}`} key={`${index}-${ent.id}`} onClick={(e) => handleButtonClick(e, ent.keyName)}>{ent.label}</a>)
              })
            }
          </div>
        );
      case 3:
        return (
          <div className={item.class[0].join(' ')}>
            <div className="mb-3">
              {
                item.label &&
                <RenderLabel htmlFor={item.htmlFor} label={item.label} />
              }
              <select id={item.id} value={value[item.keyName] || ''} onChange={(e) => handleInputChange(e, item.keyName, item.type)} className="form-select">
                {
                  Array.isArray(item.options) && item.options.length > 0 && item.options.map((option, index) => {
                    return (<option key={`${index}-${item.id}-${option.value}`} value={option.value}>{option.label}</option>)
                  })
                }
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={item.class[0].join(' ')}>
            <div className="mb-3">
              {
                item.label &&
                <RenderLabel htmlFor={item.htmlFor} label={item.label} />
              }
              {
                item.type === 'datepicker' &&
                <DatePicker oneTap={item.oneTap} id={item.id} size={item.size} style={item.dateStyles} onChange={(e) => handleDatepickerChange(e, item.keyName)} placeholder={item.placeholder} format={item.format} defaultValue={value[item.keyName] || null} />
              }
              {
                item.type === 'file' &&
                <input type={item.type} className="form-control" multiple={false} id={item.id} onChange={(e) => handleInputChange(e, item.keyName, item.type)} />
              }
              {
                ['text', 'email'].includes(item.type) &&
                <input type={item.type} className={`form-control ${item.class && item.class[0][0]}`} id={item.id} placeholder={item.placeholder} onChange={(e) => handleInputChange(e, item.keyName, item.type)} value={value[item.keyName] || ''} />
              }
            </div>
          </div>
        );
      case 5:
        return (
          <div className="col-12">
            <div className="float-end mb-4">
              {
                Array.isArray(item.entity) && item.entity.length > 0 && item.entity.map((ent, index) => {
                  return (
                    <ButtonIcon id={ent.id} classs={ent.class} index={index} keyName={ent.keyName} label={ent.label} icon={ent.icon} />
                  )
                })
              }
            </div>
          </div>
        );
      case 6:
        return (
          <div className={item.class ? item.class[0].join(' ') : ''}>
            <div className="mb-3">
              <div id={item.id} className="mb-2">{item.label}</div>
              {
                Array.isArray(item.fields) && item.fields.length > 0 && item.fields.map((field, index) => {
                  console.log('fieldfield.typefield.type', field);
                  return (
                    <div key={`${index}-${field.id}`} className="form-check form-check-inline">
                      {
                        item.type === 'checkbox' &&
                        <input type={item.type} name={item.name} className="form-check-input" id={field.id} onChange={(e) => handleInputChange(e, field.keyName, item.type)} defaultChecked={value[field.keyName] || false} />
                      }
                      {
                        item.type === 'radio' &&
                        <input type={item.type} name={item.name} className="form-check-input" id={field.id} onChange={(e) => handleInputChange(e, item.keyName, item.type)} value={field.value} checked={field.value === value[item.keyName] || ''} />
                      }
                      {
                        field.label &&
                        <RenderLabel htmlFor={field.htmlFor} label={field.label} />
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
        );
      case 7:
        return (
          <div id={item.id} key={item.id} className={item.class[0].join(' ')}>
            <div className="mb-3">
              <item.type>{item.label}</item.type>
              <p>{item.value}</p>
              {
                item.value2 &&
                <p className={item.class[1].join(' ')}>{item.value2}</p>
              }
            </div>
          </div>
        );
      case 8:
        return (
          <div id={item.id} key={item.id} className={item.class[0].join(' ')}>
            <div className="dropdown">
              <button className="btn btn-secondary btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-funnel"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Option
                      </label>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Option
                      </label>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Option
                      </label>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Option
                      </label>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );
      case 9:
        return (
          <div id={item.id} key={item.id} className={item.class[0].join(' ')}>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control" placeholder="search" />
            </div>
          </div>
        );
      case 10:
        return (
          <div id={item.id} key={item.id} className={item.class[0].join(' ')}>
            <div className={item.class[1].join(' ')}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {
                      Array.isArray(item.value.thead) && item.value.thead.length > 0 && item.value.thead.map((field, index) => {
                        return (
                          <th key={`${field}-${index}`}>{field}</th>
                        )
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    Array.isArray(item.value.tbody) && item.value.tbody.length > 0 && item.value.tbody.map((row, rowIndex) => {
                      return (
                        <tr key={`${item.id}-${rowIndex}-tr`}>
                          {
                            row.map((cell, cellIndex) => {
                              let mater = [];
                              if (typeof cell === "string") {
                                mater = cell.split("^");
                              }
                              return (
                                cellIndex === 0 ?
                                  <td key={`cell-${item.id}-${rowIndex}-${cellIndex}`}><a href="#!" className="coloured-link" onClick={(e) => handleButtonClick(e, item.keyName.open, mater[1])}>{mater[0]}</a></td> :
                                  mater[0] === "Actions" ?
                                    <td key={`cell-${item.id}-${rowIndex}-${cellIndex}`}>
                                      <a href="#!" className="me-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit" onClick={(e) => handleButtonClick(e, item.keyName.edit, mater[1])}><i className="bi bi-pencil-square"></i></a>
                                      <a href="#!" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete" onClick={(e) => handleButtonClick(e, item.keyName.delete, mater[1])}><i className="bi bi-x-square"></i></a>
                                    </td> :
                                    <td key={`cell-${item.id}-${rowIndex}-${cellIndex}`}>{cell}</td>
                              )
                            })
                          }
                        </tr>
                      )
                    })
                  }
                  {
                    item.value.tbody === 'loading' &&
                    <tr>
                      <td colspan={item.value.columns} className="align-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  }
                  {
                    item.value.tbody.length === 0 &&
                    <tr>
                      <td colspan={item.value.columns} className="align-center">No Data Available</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        );
      case 11:
        return (
          <div id={item.id} key={item.id} className={item.class[0].join(' ')}>
            <p>Showing 1-2 of 2</p>
          </div>
        );
      case 12:
        return (
          <div id={item.id} key={item.id} className={item.class[0].join(' ')}>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li className="page-item disabled">
                  <a className="page-link">Previous</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        );

      case 'group_1':
        return (
          <div className={item.class[0].join(' ')}>
            <div className="mb-3">
              {
                Array.isArray(item.fields) && item.fields.length > 0 && item.fields.map((field, index) => {
                  
                  return (
                    <>
                      {
                        field.label &&
                        <RenderLabel htmlFor={field.htmlFor} label={field.label} />
                      }
                      {
                        field.type === 'text' &&
                        <input type={field.type} className={`form-control ${field.class && field.class[0][0]}`} id={field.id} placeholder={field.placeholder} onChange={(e) => handleInputChange(e, field.keyName, field.type)} value={value[field.keyName] || ''} />
                      }
                      {
                        field.type === 'textarea' &&
                        <textarea className={`form-control form-area ${field.class && field.class[0][0]}`} id={field.id} placeholder={field.placeholder} onChange={(e) => handleInputChange(e, field.keyName, field.type)} value={value[field.keyName] || ''}></textarea>
                      }
                      {
                        field.type === 'button' &&
                        <>
                          {
                            Array.isArray(field.entity) && field.entity.length > 0 && field.entity.map((ent, index) => {
                              return (
                                <ButtonIcon id={ent.id} classs={ent.class} index={index} keyName={ent.keyName} label={ent.label} icon={ent.icon} />
                              )
                            })
                          }
                        </>
                      }
                    </>
                  )
                })
              }
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      {renderField()}
    </React.Fragment>
  );
};

export default VendorForm;
