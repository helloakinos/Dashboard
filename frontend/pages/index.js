import Layout from "../components/Layout";
import SearchBar from "../components/Searchbar";
import styles from "./dashboard.module.css";
import { Dropdown } from "react-bootstrap";
import SSRProvider from "react-bootstrap/SSRProvider";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getName } from "../src/authSlice";

// data visualisation
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

// reference
import axios from "axios";
import RowsData from "../components/RowsData";

function Dashboard({ toggleName }) {
  const selectedFarm = "farm1";
  const [fullscreen, setFullscreen] = useState(false);
  const [reportDataRow, setReportDataRow] = useState([]);
  const [dataFromBackend, setDataFromBackend] = useState([]);
  const [growthStage, setGrowthStage] = useState([]);

  const router = useRouter();
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.authStore.authenticated);

  useEffect(() => {
    const token = localStorage.getItem("LimaToken");
    if (!authenticated && !token) {
      router.push("/login");
    } else {
      axios
        .get(`${process.env.custom_API}/data/mydata`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status == 401) {
            setReportDataRow([]);
          }
          dispatch(getName(res.data.name));
          setReportDataRow(res.data.All_Data);
          setDataFromBackend(res.data);
          const unique = (value, index, self) => {
            return self.indexOf(value) === index;
          };
          const stageValue = res.data.GrowthStage.filter(unique).sort();
          const stage = stageValue.map((stage) => `Stage ${stage}`);
          setGrowthStage(stage);
        });
    }
  }, [authenticated]);

  const dropdownData = [
    {
      filtername: "Project Harvest Date",
      data: ["This week", "Next 3 days", "Next 7 days", "Next 30 days"],
    },
    {
      filtername: "Growth Stage",
      data: growthStage,
    },
  ];
  const rowData = reportDataRow;
  const reportColumn = (
    <div className={`flex justify-between ${styles.reportColumn}`}>
      <span className={`pl-1 ${styles.blockWidth}`}>
        Block
        <button onClick={(e) => sortArray("block")}>
          <i className="bx bx-sort"></i>
        </button>
      </span>
      <span className={`${styles.predictedYieldWidth}`}>
        Predicted Yield
        <button onClick={(e) => sortArray("predictedYield")}>
          <i className="bx bx-sort"></i>
        </button>
      </span>
      <span className={styles.stemDensityWidth}>
        Stem Density / Metre
        <button onClick={(e) => sortArray("stemDensityMetre")}>
          <i className="bx bx-sort"></i>
        </button>
      </span>
      <span className={styles.PredictedHarvestDateWidth}>
        Predicted Harvest Date
        <button onClick={(e) => sortArray("predictedHarvestDate")}>
          <i className="bx bx-sort"></i>
        </button>
      </span>
      <span className={styles.growthStageWidth}>
        Growth Stage
        <button onClick={(e) => sortArray("growthStage")}>
          <i className="bx bx-sort"></i>
        </button>
      </span>
      <span className={styles.actionsWidth}>Actions</span>
    </div>
  );

  const [search, setSearch] = useState("");

  function searchBarFunction(searchValue) {
    const lowerSearch = searchValue.toLowerCase();
    return reportDataRow.filter((rowdata) => {
      // the commented out code below are filter functionalities that work on their own, just not in combination with the searchbar
      // console.log(rowdata.Block.toLowerCase().indexOf(lowerSearch) > -1)
      return (
        rowdata.Block.toLowerCase().indexOf(lowerSearch) > -1
        // rowdata.PredictedYield.toLowerCase().indexOf(lowerSearch)>-1||
        // rowdata.StemDensityMetre.toLowerCase().indexOf(lowerSearch)>-1||
        // rowdata.PredictedHarvestDate.toLowerCase().indexOf(lowerSearch)>-1||
        // rowdata.GrowthStage.toLowerCase().indexOf(lowerSearch)>-1
      );
    });
  }
  const [filter, setFilter] = useState("");

  function filterFunction(filterValue) {
    return reportDataRow.filter((rowdata) => {
      return rowdata.GrowthStage == Number(filterValue.slice(-1));
    });
  }

  const dropdownMenu = dropdownData.map(({ filtername, data }) => (
    <Dropdown key={filtername} className="ml-2 active:bg-white">
      <Dropdown.Toggle
        className={`${styles.dropdownToggle} ${styles.dropdown} hover:bg-white hover:text-greenish hover:border-greenish`}
      >
        <span className={`${styles.dropdown}`}>
          <i className="bx bx-filter-alt"></i> {filtername}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        {data.map((dataitem) => (
          <Dropdown.Item
            key={dataitem}
            align="end"
            max-width="30px"
            onClick={(e) => {
              if (filtername == "Growth Stage") setFilter(dataitem.slice(-1));
            }}
          >
            {dataitem}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  ));

  const sortArray = (type) => {
    const types = {
      block: "Block",
      predictedYield: "PredictedYield_new",
      stemDensityMetre: "StemDensityMetre_new",
      predictedHarvestDate: "PredictedHarvestDate_new",
      growthStage: "GrowthStage",
    };
    const sortProperty = types[type];
    const sorted = [...rowData].sort((a, b) => {
      if (sortProperty == "PredictedHarvestDate_new") {
        return new Date(b[sortProperty]) - new Date(a[sortProperty]);
      } else if (sortProperty == "Block") {
        return b[sortProperty].localeCompare(a[sortProperty]);
      }
      return b[sortProperty] - a[sortProperty];
    });
    setReportDataRow(sorted);
  };

  const statusReport = (
    <>
      <div className="flex justify-between mb-1">
        <span className={styles.headingFontSize}>Status Report</span>
        <button
          className={styles.fullscreenButton}
          onClick={() => setFullscreen((prev) => !prev)}
        >
          <i className={`bx bx-fullscreen ${styles.fullscreenButtonIcon}`}></i>
        </button>
      </div>
      <p className={styles.farmFontSize}>{selectedFarm}</p>
      <br></br>
      <div className="flex justify-between">
        <SearchBar searchChange={setSearch} />
        <div className="flex">{dropdownMenu}</div>
      </div>
      <br></br>
      <div className="mt-2">
        {reportColumn}
        {/* // You can either use line 219 for searchbar, or 220 for growth stage filter; not both at the same time */}
        <RowsData reportDataRow={searchBarFunction(search)} />
        {/* <RowsData reportDataRow={filterFunction(filter)} /> */}
        <br></br>
      </div>
    </>
  );

  const linedata = {
    labels: dataFromBackend.Block,
    datasets: [
      {
        data: dataFromBackend.PredictedYield_new,
      },
    ],
  };

  const lineoptions = {
    plugins: {
      legend: {
        position: "top",
        align: "centre",
        title: {
          text: "Expected Yield to Block",
          display: true,
          color: "#000",
          font: {
            size: 18,
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(47,97,68, 1)",
        fill: "start",
        backgroundColor: "rgba(47,97,68, 0.3)",
      },
      point: {
        radius: 0,
        hitRadius: 0,
      },
    },
    scales: {
      xAxis: {
        display: true,
      },
      yAxis: {
        display: true,
      },
    },
  };

  const bardata = {
    labels: dataFromBackend.Block,
    datasets: [
      {
        label: "Yield",
        borderRadius: 30,
        data: dataFromBackend.PredictedYield_new,
        backgroundColor: "rgba(32, 214, 155, 1)",
        barThickness: 15,
      },
      {
        label: "Block",
        borderRadius: 20,
        data: dataFromBackend.Block,
        backgroundColor: "rgba(1, 98, 255, 1)",
        barThickness: 15,
      },
    ],
  };

  const baroptions = {
    plugins: {
      legend: {
        position: "top",
        align: "centre",
        labels: {
          boxWidth: 7,
          usePointStyle: true,
          pointStyle: "circle",
        },
        title: {
          text: "Expected Yield to Block",
          display: true,
          color: "#000",
          font: {
            size: 18,
          },
        },
      },
    },
    scales: {
      xAxis: {
        display: true,
      },
      yAxis: {
        max: 30000,
      },
    },
    elements: {
      bar: {
        barPercentage: 0.3,
        catagoryPercentage: 1,
      },
    },
  };

  const doughnut_colors = [
    "Red",
    "Blue",
    "Yellow",
    "Brown",
    "DarkGrey",
    "Green",
    "DeepPink",
    "Indigo",
    "LightSalmon",
    "Olive",
    "Pink",
    "YellowGreen",
    "Wheat",
    "Violet",
    "Tomato",
    "Teal",
    "Snow",
    "Sienna",
    "RosyBrown",
    "Plum",
  ];
  let implemented_doughnut_colors = [];
  for (let x in dataFromBackend.PredictedYield_new) {
    implemented_doughnut_colors.push(doughnut_colors[x]);
  }

  const doughnutdata = {
    backgroundColor: implemented_doughnut_colors,
    labels: dataFromBackend.Block,
    datasets: [
      {
        label: "Yield to block",
        data: dataFromBackend.PredictedYield_new,
        backgroundColor: implemented_doughnut_colors,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutoptions = {
    elements: {
      arc: {
        weight: 0.5,
        borderWidth: 3,
      },
    },
    cutout: 60,
  };

  return (
    <Layout>
      <SSRProvider>
        <div className={`${fullscreen ? "mr-3" : "flex"} ${styles.height}`}>
          <div
            className={`p-4 bg-white overflow-y-scroll ${
              fullscreen ? `block ${styles.height}` : "w-2/3"
            }`}
          >
            {statusReport}
          </div>
          <div
            className={`ml-3 ${
              fullscreen ? "hidden" : "w-1/3"
            } overflow-y-scroll`}
          >
            <div
              className={`px-4 mb-4 mr-3 h-1/3 bg-white overflow-y-scroll ${styles.border}`}
            >
              <div>
                <Line
                  data={linedata}
                  width={100}
                  height={90}
                  options={lineoptions}
                />
              </div>
            </div>
            <div
              className={`px-4 mb-4 mr-3 h-1/3 bg-white overflow-y-scroll ${styles.border}`}
            >
              <div>
                <Bar data={bardata} height={300} options={baroptions} />
              </div>
            </div>
            <div
              className={`px-4 mb-4 mr-3 h-1/3 bg-white overflow-y-scroll ${styles.border}`}
            >
              <div>
                <Doughnut
                  data={doughnutdata}
                  width={50}
                  height={50}
                  options={doughnutoptions}
                />
              </div>
            </div>
            <div
              className={`px-4 mb-4 mr-3 h-1/3 bg-white overflow-y-scroll ${styles.border}`}
            >
              <div className="text-xl text-greenish text-right">
                Presented to you by <br></br> Akin, Claire & Vincent<br></br>{" "}
                &copy; 2022
              </div>
            </div>
          </div>
        </div>
      </SSRProvider>
    </Layout>
  );
}

export default Dashboard;
