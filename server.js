/*eslint no-console: 0*/
"use strict";

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const xsHDBConn = require("@sap/hdbext");
const xsenv = require("@sap/xsenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

xsenv.loadEnv();
let hanaOptions = xsenv.getServices({
	hana: {
		tag: "hana"
	}
});

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Direct Connections REST API",
            description: "Direct Connections REST API - Innovator Challenge 2020",
            contact: {
                name: "Team 209"
            },
            servers: ["https://ic-cf-2020-workspaces-ws-9wfzb-app3.eu10.applicationstudio.cloud.sap"]
        }
    },
    apis: ["controllers/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);


const auth = require("./routes/auth");
const products = require("./routes/products");
const opportunities = require("./routes/opportunities");

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enabling CORS for frontend browser request
app.use(cors());

// Logging
app.use(morgan("dev"));

// HANA connections
app.use(xsHDBConn.middleware(hanaOptions.hana));

// Swagger documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/v1/products", products);
app.use("/api/v1/opportunities", opportunities);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
const nodeEnv = process.env.NODE_ENV || "dev";

app.listen(PORT, console.log(`Server running in ${nodeEnv} mode on port ${PORT}`));