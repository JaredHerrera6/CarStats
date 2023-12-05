import React from "react";
import { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import Baseurl from "../api/Baseurl";

function CarStats() {
  //State Hooks to set the Data Array
  const [Years, setYears] = useState([]);
  const [Makes, setMakes] = useState([]);
  const [Models, setModels] = useState([]);
  const [Trims, setTrims] = useState([]);
  const [ModelData, setModelData] = useState([]);

  //State Hooks to set the Chosen Values
  const [Year, setYear] = useState(null);
  const [Make, setMake] = useState(null);
  const [Model, setModel] = useState(null);
  const [Modelid, setModelid] = useState(null);

  //useEffect but now using Axios

  //useEffect to Fectch the Years
  useEffect(() => {
    getYears();
  }, []);
  async function getYears() {
    const api = "https://www.carqueryapi.com/api/0.3/?cmd=getYears";
    const result = await fetch(api, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const getResult = await result.json();
    console.log(getResult);
    console.log(result);
    setYears(getResult.Years);
  }
  //Populating the Array with the Available Years
  const available_Years = [];
  const min = Years.min_year;
  for (let i = min - 1; i < Years.max_year; i++) {
    available_Years.push(i + 1);
  }
  // Sets the Year Chosen by the user
  const handleYear = (event) => {
    const getYear = event.target.value;
    setYear(getYear);
  };
  //useEffect to fetch the Makes based on the Year Chosen
  useEffect(() => {
    const getMakes = async () => {
      const resmakes = await fetch(
        `?callback=?&cmd=getMakes&year=${Year}&sold_in_us=1`
      );
      const resmks = await resmakes.json();
      setMakes(await resmks.Makes);
    };
    getMakes();
  }, [Year]);
  //Sets the make chosen by the user
  const handleMake = (event) => {
    const getmake = event.target.value;
    setMake(getmake.toLowerCase());
  };
  //useEffect to fetch the models based on the given Year and the make
  useEffect(() => {
    const getModels = async () => {
      const resmodels = await fetch(
        `?callback=?&cmd=getModels&make=${Make}&year=${Year}&sold_in_us=1`
      );
      const resmdls = await resmodels.json();
      setModels(await resmdls.Models);
    };
    getModels();
  }, [Make]);
  //Sets the model chosen by the user
  const handleModel = (event) => {
    const getModel = event.target.value;
    setModel(getModel);
  };
  //useEffect to fetch the trims based on the given Year, make, and Model
  useEffect(() => {
    const getTrims = async () => {
      const restrims = await fetch(
        `?callback=?&cmd=getTrims&make=${Make}&year=${Year}&model=${Model}`
      );
      const restrms = await restrims.json();
      setTrims(await restrms.Trims);
    };
    getTrims();
  }, [Model]);
  //Sets the modelID based on the trim chosen by the user
  const handleTrim = (event) => {
    const getTrim = event.target.value;
    const foundtrim = Trims.find((obj) => {
      return obj.model_trim === getTrim;
    });
    setModelid(foundtrim.model_id);
    console.log(foundtrim.model_id);
  };
  //useEffect to fetch the data of the vehcile based on the ModelID of the trim chosen
  useEffect(() => {
    const getData = async () => {
      const resData = await fetch(`?callback=?&cmd=getModel&model=${Modelid}`);
      const resid = await resData.json();
      setModelData(await resid[0]);
      console.log(ModelData);
    };
    getData();
  }, [Modelid]);

  //return statement of the function
  return (
    <div className="carstats-container">
      <div className="car-search-title">
        <p>Car Stats</p>
      </div>
      <div className="page-description">
        <p>
          The Car Stats Page allows users to Retrieve Data about Several
          vehicles available from the CarQuery API. Users provide the Year,
          Make, Model, and Trim of their desired vehicle from the dataset and we
          do the rest.
        </p>
        <p className="start-search">Start Searching</p>
        <p className="search-header">Fill The Parameters to Retrieve Data:</p>
        {/*Dynamic Select*/}
        <div className="vehicle-search">
          <div className="input-search">
            <label htmlFor="Years">Year:</label>
            <select name="Years" onChange={handleYear}>
              <option value="">Select Year</option>
              {available_Years.map((year) => (
                <option>{year}</option>
              ))}
            </select>
            <label htmlFor="makes">Make:</label>
            <select name="makes" onChange={handleMake}>
              <option value="">Select Make</option>
              {Makes.map((make) => (
                <option>{make.make_display}</option>
              ))}
            </select>
            <label htmlFor="models">Model:</label>
            <select name="models" onChange={handleModel}>
              <option value="">Select Make</option>
              {Models.map((model) => (
                <option>{model.model_name}</option>
              ))}
            </select>
            <label htmlFor="trims">Trim:</label>
            <select name="trims" onChange={handleTrim}>
              <option value="">Select Trim</option>
              {Trims.map((trim) => (
                <option>{trim.model_trim}</option>
              ))}
            </select>
          </div>
          {/*Table That Displays the fetched data of the Vehicle*/}
          <div className="display-container">
            <table className="display-table">
              <tr>
                <th>Country of Origin</th>
                <td>
                  {ModelData.make_country === null
                    ? "N/A"
                    : ModelData.make_country}
                </td>
              </tr>
              <tr>
                <th>Sold in U.S.</th>
                <td>
                  {ModelData.model_sold_in_us === null
                    ? "N/A"
                    : ModelData.model_sold_in_us}
                </td>
              </tr>
              <tr>
                <th>Body Style</th>
                <td>
                  {ModelData.model_body === null ? "N/A" : ModelData.model_body}
                </td>
              </tr>
              <tr>
                <th>Engine Location</th>
                <td>
                  {ModelData.model_engine_position === null
                    ? "N/A"
                    : ModelData.model_engine_position}
                </td>
              </tr>
              <tr>
                <th>Engine Type</th>
                <td>
                  {ModelData.model_engine_type === null
                    ? "N/A"
                    : ModelData.model_engine_type}
                </td>
              </tr>
              <tr>
                <th>Engine Cylinders</th>
                <td>
                  {ModelData.model_engine_cyl === null
                    ? "N/A"
                    : ModelData.model_engine_cyl}
                </td>
              </tr>
              <tr>
                <th>Engine Displacement(cc)</th>
                <td>
                  {ModelData.model_engine_cc === null
                    ? "N/A"
                    : ModelData.model_engine_cc}
                </td>
              </tr>
              <tr>
                <th>Engine Displacement(L)</th>
                <td>
                  {ModelData.model_engine_l === null
                    ? "N/A"
                    : ModelData.model_engine_l}
                </td>
              </tr>
              <tr>
                <th>Engine Displacement(Cubic Inches)</th>
                <td>
                  {ModelData.model_engine_ci === null
                    ? "N/A"
                    : ModelData.model_engine_ci}
                </td>
              </tr>
              <tr>
                <th>Engine Bore(mm)</th>
                <td>
                  {ModelData.model_engine_bore_mm === null
                    ? "N/A"
                    : ModelData.model_engine_bore_mm}
                </td>
              </tr>
              <tr>
                <th>Engine Bore(in)</th>
                <td>
                  {ModelData.model_engine_bore_in === null
                    ? "N/A"
                    : ModelData.model_engine_bore_in}
                </td>
              </tr>
              <tr>
                <th>Engine Stroke(mm)</th>
                <td>
                  {ModelData.model_engine_stroke_mm === null
                    ? "N/A"
                    : ModelData.model_engine_stroke_mm}
                </td>
              </tr>
              <tr>
                <th>Engine Stroke(in)</th>
                <td>
                  {ModelData.model_engine_stroke_in === null
                    ? "N/A"
                    : ModelData.model_engine_stroke_in}
                </td>
              </tr>
              <tr>
                <th>Engine Valves</th>
                <td>
                  {ModelData.model_engine_valves === null
                    ? "N/A"
                    : ModelData.model_engine_valves}
                </td>
              </tr>
              <tr>
                <th>Engine Valves Per Cylinder</th>
                <td>
                  {ModelData.model_engine_valves_per_cyl === null
                    ? "N/A"
                    : ModelData.model_engine_valves_per_cyl}
                </td>
              </tr>
              <tr>
                <th>Engine Max Power(HP)</th>
                <td>
                  {ModelData.model_engine_power_hp === null
                    ? "N/A"
                    : ModelData.model_engine_power_hp}
                </td>
              </tr>
              <tr>
                <th>Engine Max Power(PS)</th>
                <td>
                  {ModelData.model_engine_power_ps === null
                    ? "N/A"
                    : ModelData.model_engine_power_ps}
                </td>
              </tr>
              <tr>
                <th>Engine Max Power(Kw)</th>
                <td>
                  {ModelData.model_engine_power_kw === null
                    ? "N/A"
                    : ModelData.model_engine_power_kw}
                </td>
              </tr>
              <tr>
                <th>Engine Max Power RPM</th>
                <td>
                  {ModelData.model_engine_power_rpm === null
                    ? "N/A"
                    : ModelData.model_engine_power_rpm}
                </td>
              </tr>
              <tr>
                <th>Engine Max Torque(NM)</th>
                <td>
                  {ModelData.model_engine_torque_nm === null
                    ? "N/A"
                    : ModelData.model_engine_torque_nm}
                </td>
              </tr>
              <tr>
                <th>Engine Max Torque(Lb-Ft)</th>
                <td>
                  {ModelData.model_engine_torque_lbft === null
                    ? "N/A"
                    : ModelData.model_engine_torque_lbft}
                </td>
              </tr>
              <tr>
                <th>Engine Max Torque(kgf-m)</th>
                <td>
                  {ModelData.model_engine_torque_kgm === null
                    ? "N/A"
                    : ModelData.model_engine_torque_kgm}
                </td>
              </tr>
              <tr>
                <th>Engine Max Torque RPM</th>
                <td>
                  {ModelData.model_engine_torque_rpm === null
                    ? "N/A"
                    : ModelData.model_engine_torque_rpm}
                </td>
              </tr>
              <tr>
                <th>Engine Compression Ratio</th>
                <td>
                  {ModelData.model_engine_compression === null
                    ? "N/A"
                    : ModelData.model_engine_compression}
                </td>
              </tr>
              <tr>
                <th>Engine Fuel Type</th>
                <td>
                  {ModelData.model_engine_fuel === null
                    ? "N/A"
                    : ModelData.model_engine_fuel}
                </td>
              </tr>
              <tr>
                <th>Drive</th>
                <td>
                  {ModelData.model_drive === null
                    ? "N/A"
                    : ModelData.model_drive}
                </td>
              </tr>
              <tr>
                <th>Transmission Type</th>
                <td>
                  {ModelData.model_transmission_type === null
                    ? "N/A"
                    : ModelData.model_transmission_type}
                </td>
              </tr>
              <tr>
                <th>Top Speed(kph)</th>
                <td>
                  {ModelData.model_top_speed_kph === null
                    ? "N/A"
                    : ModelData.model_top_speed_kph}
                </td>
              </tr>
              <tr>
                <th>Top Speed(mph)</th>
                <td>
                  {ModelData.model_top_speed_mph === null
                    ? "N/A"
                    : ModelData.model_top_speed_mph}
                </td>
              </tr>
              <tr>
                <th>0-100 kph(0-62 mph)</th>
                <td>
                  {ModelData.model_0_to_100_kph === null
                    ? "N/A"
                    : ModelData.model_0_to_100_kph}
                </td>
              </tr>
              <tr>
                <th>Doors</th>
                <td>
                  {ModelData.model_doors === null
                    ? "N/A"
                    : ModelData.model_doors}
                </td>
              </tr>
              <tr>
                <th>Seats</th>
                <td>
                  {ModelData.model_seats === null
                    ? "N/A"
                    : ModelData.model_seats}
                </td>
              </tr>
              <tr>
                <th>Weight(kg)</th>
                <td>
                  {ModelData.model_weight_kg === null
                    ? "N/A"
                    : ModelData.model_weight_kg}
                </td>
              </tr>
              <tr>
                <th>Weight(lbs)</th>
                <td>
                  {ModelData.model_weight_lbs === null
                    ? "N/A"
                    : ModelData.model_weight_lbs}
                </td>
              </tr>
              <tr>
                <th>Length(in)</th>
                <td>
                  {ModelData.model_length_in === null
                    ? "N/A"
                    : ModelData.model_length_in}
                </td>
              </tr>
              <tr>
                <th>Length(mm)</th>
                <td>
                  {ModelData.model_length_mm === null
                    ? "N/A"
                    : ModelData.model_length_mm}
                </td>
              </tr>
              <tr>
                <th>Width(in)</th>
                <td>
                  {ModelData.model_width_in === null
                    ? "N/A"
                    : ModelData.model_width_in}
                </td>
              </tr>
              <tr>
                <th>Width(mm)</th>
                <td>
                  {ModelData.model_width_mm === null
                    ? "N/A"
                    : ModelData.model_width_mm}
                </td>
              </tr>
              <tr>
                <th>Height(in)</th>
                <td>
                  {ModelData.model_height_in === null
                    ? "N/A"
                    : ModelData.model_height_in}
                </td>
              </tr>
              <tr>
                <th>Height(mm)</th>
                <td>
                  {ModelData.model_height_mm === null
                    ? "N/A"
                    : ModelData.model_height_mm}
                </td>
              </tr>
              <tr>
                <th>WheelBase(in)</th>
                <td>
                  {ModelData.model_wheelbase_in === null
                    ? "N/A"
                    : ModelData.model_wheelbase_in}
                </td>
              </tr>
              <tr>
                <th>WheelBase(mm)</th>
                <td>
                  {ModelData.model_wheelbase_mm === null
                    ? "N/A"
                    : ModelData.model_wheelbase_mm}
                </td>
              </tr>
              <tr>
                <th>Fuel Economy City(mpg)</th>
                <td>
                  {ModelData.model_mpg_city === null
                    ? "N/A"
                    : ModelData.model_mpg_city}
                </td>
              </tr>
              <tr>
                <th>Fuel Economy City(l/100km)</th>
                <td>
                  {ModelData.model_lkm_city === null
                    ? "N/A"
                    : ModelData.model_lkm_city}
                </td>
              </tr>
              <tr>
                <th>Fuel Economy Hwy(mpg)</th>
                <td>
                  {ModelData.model_mpg_hwy === null
                    ? "N/A"
                    : ModelData.model_mpg_hwy}
                </td>
              </tr>
              <tr>
                <th>Fuel Economy Hwy(l/100km)</th>
                <td>
                  {ModelData.model_lkm_hwy === null
                    ? "N/A"
                    : ModelData.model_lkm_hwy}
                </td>
              </tr>
              <tr>
                <th>Fuel Economy Mixed(mpg)</th>
                <td>
                  {ModelData.model_mpg_mixed === null
                    ? "N/A"
                    : ModelData.model_mpg_mixed}
                </td>
              </tr>
              <tr>
                <th>Fuel Economy(l/100km)</th>
                <td>
                  {ModelData.model_lkm_mixed === null
                    ? "N/A"
                    : ModelData.model_lkm_mixed}
                </td>
              </tr>
              <tr>
                <th>Fuel Capacity(l)</th>
                <td>
                  {ModelData.model_fuel_cap_l === null
                    ? "N/A"
                    : ModelData.model_fuel_cap_l}
                </td>
              </tr>
              <tr>
                <th>Fuel Capacity(g)</th>
                <td>
                  {ModelData.model_fuel_cap_g === null
                    ? "N/A"
                    : ModelData.model_fuel_cap_g}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CarStats;
