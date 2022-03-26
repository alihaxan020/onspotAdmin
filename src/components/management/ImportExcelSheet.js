import React, { useState } from "react";
import "../adminStyles/AdminStyles.css";
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import XLSX from 'xlsx'
import { BiImport } from "react-icons/bi";
import './ImportExcelSheet.css'
import axios from "axios";
import "../adminStyles/AdminStyles.css";
import { baseUrl } from "../constants/BaseUrl";
const EXTENSIONS = ['xlsx', 'xls', 'csv']




const ImportExcelSheet = () => {

  const [colDefs, setColDefs] = useState()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)


  const getExention = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }

  // const convertToJson = (headers, data) => {
  //   const rows = []
  //   data.forEach(row => {
  //     let rowData = {}
  //     row.forEach((element, index) => {
  //       rowData[headers[index]] = element
  //     })
  //     rows.push(rowData)

  //   });
  //   return rows
  // }

  const importExcel = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: "binary" })

      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })

      const headers = fileData[0]
      const heads = headers.map(head => ({ title: head }))
      setColDefs(heads)

      //removing header
      fileData.splice(0, 1)
      console.log(fileData)

      // setData(convertToJson(headers, fileData))
      setData(fileData)
      setLoading(true)
    }

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      }
      else {
        alert("Invalid file input, Select Excel, CSV file")
      }
    } else {
      setData([])
      setColDefs([])
    }
  }

  const validate = Yup.object({
    serialNumbers: Yup.array(),
    names: Yup.array(),
    firstNames: Yup.array(),
    surNames: Yup.array(),
    sexes: Yup.array(),
    ages: Yup.array(),
    germans: Yup.array(),
    driveLics: Yup.array(),
    smokings: Yup.array(),
    phoneNumbers: Yup.array()


  })

  if (loading) {
    return (
      <>
        <div className="form-main">
          <div style={{ width: '98%' }}>
            <Formik
              initialValues={{
                serialNumbers: data.map((item) => item[0] || ''),
                names: data.map((item) => item[1] || ''),
                firstNames: data.map((item) => item[2] || ''),
                surNames: data.map((item) => item[3] || ''),
                sexes: data.map((item) => item[4] || ''),
                ages: data.map((item) => item[5] || ''),
                germans: data.map((item) => item[6] || ''),
                driveLics: data.map((item) => item[7] || ''),
                smokings: data.map((item) => item[8] || ''),
                phoneNumbers: data.map((item) => item[9] || ''),
              }}
              validationSchema={validate}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const res = await axios.post(`${baseUrl}/api/v1/nurses/savenurses`, { data: values });
                  console.log(res)
                  if (res.status === 200) {
                    setSubmitting(false);
                    alert(res.data.data)
                    return setLoading(false)
                  }
                  return alert("fail")
                } catch (error) {
                  console.log(error)
                }
              }}
            >
              {({ isSubmitting, initialValues }) => (
                <div>
                  <Form>
                    <div className="main-wrapper">
                      <div className="inner-wrapper">
                        <div className="ind-element">
                          <div className="label-parent">
                            <label className="label">Serial Number</label>
                          </div>
                          <FieldArray name='serialNumbers'>
                            {fieldArrayProps => {
                              const { form } = fieldArrayProps
                              const { values } = form
                              const { serialNumbers } = values
                              return <div>
                                {
                                  serialNumbers.map((serialNumber, index) => (
                                    <div key={index}>
                                      <Field className='field' name={`serialNumbers[${index}]`} />
                                    </div>
                                  ))
                                }
                              </div>
                            }}
                          </FieldArray>
                        </div>
                        <div className="ind-element">
                          <div className="label-parent">
                            <label className="label">Name</label>
                          </div>
                          <FieldArray name='names'>
                            {fieldArrayProps => {
                              const { form } = fieldArrayProps
                              const { values } = form
                              const { names } = values
                              return <div>
                                {
                                  names.map((name, index) => (
                                    <div key={index}>
                                      <Field className='field' name={`names[${index}]`} />
                                    </div>
                                  ))
                                }
                              </div>
                            }}
                          </FieldArray>
                        </div>
                        <div className="ind-element">
                          <div className="label-parent">
                            <label className="label">First Name</label>
                          </div>
                          <FieldArray name='firstNames'>
                            {fieldArrayProps => {
                              const { form } = fieldArrayProps
                              const { values } = form
                              const { firstNames } = values
                              return <div>
                                {
                                  firstNames.map((firstName, index) => (
                                    <div key={index}>
                                      <Field className='field' name={`firstNames[${index}]`} />
                                    </div>
                                  ))
                                }
                              </div>
                            }}
                          </FieldArray>
                        </div>
                        <div className="ind-element">
                          <div className="label-parent">
                            <label className="label">Sur Name</label>
                          </div>
                          <FieldArray name='surNames'>
                            {fieldArrayProps => {
                              const { form } = fieldArrayProps
                              const { values } = form
                              const { surNames } = values
                              return <div>
                                {
                                  surNames.map((surName, index) => (
                                    <div key={index}>
                                      <Field className='field' name={`surNames[${index}]`} />
                                    </div>
                                  ))
                                }
                              </div>
                            }}
                          </FieldArray>
                        </div>
                        <div className="ind-element">
                          <div className="label-parent">
                            <label className="label">Sex</label>
                          </div>
                          <FieldArray name='sexes'>
                            {fieldArrayProps => {
                              const { form } = fieldArrayProps
                              const { values } = form
                              const { sexes } = values
                              return <div>
                                {
                                  sexes.map((sex, index) => (
                                    <div key={index}>
                                      <Field className='field' name={`sexes[${index}]`} />
                                    </div>
                                  ))
                                }
                              </div>
                            }}
                          </FieldArray>
                        </div>

                        <div className="ind-element">
                          <div className="label-parent">
                            <label className="label">Age</label>
                          </div>
                          <FieldArray name='ages'>
                            {fieldArrayProps => {
                              const { form } = fieldArrayProps
                              const { values } = form
                              const { ages } = values
                              return <div>
                                {
                                  ages.map((age, index) => (
                                    <div key={index}>
                                      <Field className='field' name={`ages[${index}]`} />
                                    </div>
                                  ))
                                }
                              </div>
                            }}
                          </FieldArray>
                        </div>

                        <div className="ind-element">
                          <div className="label-parent">
                            <label className="label">Driving License</label>
                          </div>
                          <FieldArray name='driveLics'>
                            {fieldArrayProps => {
                              const { form } = fieldArrayProps
                              const { values } = form
                              const { driveLics } = values
                              return <div>
                                {
                                  driveLics.map((surName, index) => (
                                    <div key={index}>
                                      <Field className='field' name={`driveLics[${index}]`} />
                                    </div>
                                  ))
                                }
                              </div>
                            }}
                          </FieldArray>
                        </div>

                        <div className="ind-element">
                          <div className="label-parent">
                            <label className="label">German</label>
                          </div>
                          <FieldArray name='germans'>
                            {fieldArrayProps => {
                              const { form } = fieldArrayProps
                              const { values } = form
                              const { germans } = values
                              return <div>
                                {
                                  germans.map((german, index) => (
                                    <div key={index}>
                                      <Field className='field' name={`germans[${index}]`} />
                                    </div>
                                  ))
                                }
                              </div>
                            }}
                          </FieldArray>
                        </div>
                        <div className="ind-element">
                          <div className="label-parent">
                            <label className="label">Smoking</label>
                          </div>
                          <FieldArray name='smokings'>
                            {fieldArrayProps => {
                              const { form } = fieldArrayProps
                              const { values } = form
                              const { smokings } = values
                              return <div>
                                {
                                  smokings.map((smoking, index) => (
                                    <div key={index}>
                                      <Field className='field' name={`smokings[${index}]`} />
                                    </div>
                                  ))
                                }
                              </div>
                            }}
                          </FieldArray>
                        </div>
                        <div className="ind-element">
                          <div className="label-parent">
                            <label className="label">Phone Number</label>
                          </div>
                          <FieldArray name='phoneNumbers'>
                            {fieldArrayProps => {
                              const { form } = fieldArrayProps
                              const { values } = form
                              const { phoneNumbers } = values
                              return <div>
                                {
                                  phoneNumbers.map((phoneNumber, index) => (
                                    <div key={index}>
                                      <Field className='field' name={`phoneNumbers[${index}]`} />
                                    </div>
                                  ))
                                }
                              </div>
                            }}
                          </FieldArray>
                        </div>
                      </div>

                    </div>
                    <div>
                      <button style={{
                        marginLeft: '12px', cursor: 'pointer', marginTop: 10,
                        backgroundColor: '#2c2c2e',
                        padding: '4px', borderRadius: '4px', width: '100px', color: 'white'
                      }}
                        disabled={isSubmitting} type="submit">Submit</button>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </>
    )
  }
  else {
    return (
      <div className="form-main">
        <div className="icon-main">
          <div className="inner-icon">
            <div style={{ textAlign: 'center' }}>
              <label for="fileUpload"><BiImport className='import-icon' /></label>
              <input id="fileUpload" type="file" onChange={importExcel} style={{ display: 'none' }} />
              <h2>Upload Excel Sheet</h2>
            </div>
          </div>
        </div>
      </div>

    )

  }




};

export default ImportExcelSheet;
