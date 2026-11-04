import { useState } from "react";
import "./App.css";

import FileUpload from "./components/FileUpload";
import DataGrid from "./components/DataGrid";
import ColumnMapping from "./components/ColumnMapping";
import DataValidation from "./components/DataValidation";
import DataSummary from "./components/DataSummary";
import Transformation from "./components/Transformation";
import ProcessingProgress from "./components/ProcessingProgress";
import ErrorRows from "./components/ErrorRows";
import Export from "./components/Export";
function App() {
  const [csvData, setCsvData] = useState([]);
  const [datasetId, setDatasetId] = useState(null);

  const [mappedData, setMappedData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);

  // Get columns from uploaded data
  const columns =
    csvData.length > 0
      ? Object.keys(csvData[0])
      : [];

  // =========================
  // FILE UPLOAD
  // =========================

  const handleFileUpload = (data) => {
    setCsvData(data);

    // Clear previous processing
    setMappedData([]);
    setTransformedData([]);
  };

  // =========================
  // DATASET CREATED
  // =========================

  const handleDatasetCreated = (dataset) => {
    setDatasetId(dataset.id);

    console.log("Dataset ID:", dataset.id);
    console.log("Dataset:", dataset);
  };

  // =========================
  // MAPPING COMPLETE
  // =========================

  const handleMappingComplete = (data) => {
    setMappedData(data);
    setTransformedData(data);
  };

  return (
    <div className="app">

      {/* ================= HEADER ================= */}

      <header className="app-header">
        <div className="brand">

          <div className="brand-icon">
            ⚡
          </div>

          <div>
            <h1>StreamWeaver</h1>
            <p>CSV Data Processing Pipeline</p>
          </div>

        </div>

        <div className="status-badge">
          <span></span>
          Frontend Active
        </div>
      </header>


      {/* ================= HERO ================= */}

      <section className="hero">

        <div>

          <span className="hero-tag">
            DATA PROCESSING PLATFORM
          </span>

          <h2>
            Transform your data
            <br />
            <strong>seamlessly.</strong>
          </h2>

          <p>
            Upload, map, transform, validate and
            process your CSV data in one simple workflow.
          </p>

        </div>

      </section>


      {/* ================= PIPELINE ================= */}

      <section className="pipeline">

        <div className="pipeline-step active">
          <span>01</span>
          Upload
        </div>

        <div className="pipeline-line"></div>

        <div className="pipeline-step">
          <span>02</span>
          Preview
        </div>

        <div className="pipeline-line"></div>

        <div className="pipeline-step">
          <span>03</span>
          Mapping
        </div>

        <div className="pipeline-line"></div>

        <div className="pipeline-step">
          <span>04</span>
          Transform
        </div>

        <div className="pipeline-line"></div>

        <div className="pipeline-step">
          <span>05</span>
          Validate
        </div>

        <div className="pipeline-line"></div>

        <div className="pipeline-step">
          <span>06</span>
          Export
        </div>

      </section>


      {/* ================= MAIN ================= */}

      <main className="main-content">


        {/* ================= UPLOAD ================= */}

        <section className="card upload-card">

          <div className="section-heading">

            <div className="section-icon">
              📁
            </div>

            <div>
              <h2>Upload CSV</h2>

              <p>
                Start by uploading your dataset
              </p>
            </div>

          </div>

          <FileUpload
            onDataParsed={handleFileUpload}
            onDatasetCreated={handleDatasetCreated}
          />

          {/* Dataset ID display */}

          {datasetId && (
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                borderRadius: "6px",
                background: "#1e293b",
              }}
            >
              <strong>Dataset ID:</strong>{" "}
              {datasetId}
            </div>
          )}

        </section>


        {/* ================= DATA PREVIEW ================= */}

        <section className="card">

          <div className="section-heading">

            <div className="section-icon">
              📊
            </div>

            <div>

              <h2>Data Preview</h2>

              <p>
                Review your uploaded records
              </p>

            </div>

          </div>

          <DataGrid rows={csvData} />

        </section>


        {/* ================= COLUMN MAPPING ================= */}

        <section className="card">

          <div className="section-heading">

            <div className="section-icon">
              🔗
            </div>

            <div>

              <h2>Column Mapping</h2>

              <p>
                Map source columns to destination fields
              </p>

            </div>

          </div>

          <ColumnMapping
            columns={columns}
            rows={csvData}
            datasetId={datasetId}
            onMappingComplete={handleMappingComplete}
          />

        </section>


        {/* ================= TRANSFORMATION ================= */}

        <section className="card">

          <div className="section-heading">

            <div className="section-icon">
              ⚙️
            </div>

            <div>

              <h2>Data Transformation</h2>

              <p>
                Clean and transform your mapped data
              </p>

            </div>

          </div>

      <Transformation
  rows={mappedData}
  datasetId={datasetId}
  onTransformationComplete={setTransformedData}
/>

        </section>


        {/* ================= TRANSFORMED DATA ================= */}

        {transformedData.length > 0 && (

          <section className="card">

            <div className="section-heading">

              <div className="section-icon">
                ✨
              </div>

              <div>

                <h2>Transformed Data</h2>

                <p>
                  Preview your transformed dataset
                </p>

              </div>

            </div>


            <div className="table-wrapper">

              <table className="modern-table">

                <thead>

                  <tr>

                    {Object.keys(
                      transformedData[0]
                    ).map((column) => (

                      <th key={column}>
                        {column}
                      </th>

                    ))}

                  </tr>

                </thead>


                <tbody>

                  {transformedData.map(
                    (row, index) => (

                      <tr key={index}>

                        {Object.keys(
                          transformedData[0]
                        ).map((column) => (

                          <td key={column}>
                            {row[column]}
                          </td>

                        ))}

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </section>

        )}


        {/* ================= PROCESSING ================= */}

        <section className="card">

          <div className="section-heading">

            <div className="section-icon">
              ⚡
            </div>

            <div>

              <h2>Processing</h2>

              <p>
                Process your transformed records
              </p>

            </div>

          </div>

          <ProcessingProgress
            rows={transformedData}
          />

        </section>


        {/* ================= VALIDATION ================= */}

        <section className="card">

          <div className="section-heading">

            <div className="section-icon">
              ✓
            </div>

            <div>

              <h2>Data Validation</h2>

              <p>
                Check your data for errors
              </p>

            </div>

          </div>

          <DataValidation
            rows={transformedData}
            datasetId={datasetId}
          />

        </section>


        {/* ================= ERRORS ================= */}

        <section className="card">

          <div className="section-heading">

            <div className="section-icon">
              ⚠️
            </div>

            <div>

              <h2>Validation Errors</h2>

              <p>
                Review records that need attention
              </p>

            </div>

          </div>

          <ErrorRows
            rows={transformedData}
          />

        </section>


        {/* ================= SUMMARY ================= */}

        <section className="card summary-card">

          <div className="section-heading">

            <div className="section-icon">
              📈
            </div>

            <div>

              <h2>Data Summary</h2>

              <p>
                Overview of your processed dataset
              </p>

            </div>

          </div>

          <DataSummary
            rows={transformedData}
          />
        <Export datasetId={datasetId} />
        
        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="app-footer">

        <p>
          ⚡ StreamWeaver
          &nbsp;•&nbsp;
          CSV Data Processing Pipeline
        </p>

        <span>
          Built with React
        </span>

      </footer>

    </div>
  );
}

export default App;