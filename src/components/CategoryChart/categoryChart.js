import React from 'react';
import ChartistGraph from "react-chartist";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {makeStyles} from "@material-ui/core/styles";


import axios from 'axios';
import Modal from "../Modal/modal";

const useStyles = makeStyles(styles);

const chartOptions = {
    options: {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 250,
        chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
        }
    },
    responsiveOptions: [
        [
            "screen and (max-width: 640px)",
            {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }
        ]
    ],
    animation: {
        draw: function (data) {
            if (data.type === "bar") {
                data.element.animate({
                    opacity: {
                        begin: (data.index + 1) * 80,
                        dur: 500,
                        from: 0,
                        to: 1,
                        easing: "ease"
                    }
                });
            }
        }
    }
};
const CategoryChart = () => {
    const classes = useStyles();

    let [responseData, setResponseData] = React.useState({})
    const query = `
        PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
        PREFIX nobel: <http://data.nobelprize.org/terms/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX dbpo: <http://dbpedia.org/ontology/> 
        SELECT (COUNT(?label) AS ?count) ?l
        WHERE { 
        ?laur rdf:type nobel:Laureate . 
        ?laur rdfs:label ?label . 
        ?laur nobel:laureateAward ?award . 
        ?award nobel:category ?cat .
        ?cat rdfs:label ?l.
        }
        GROUP BY ?l
    `;

    const queryUrl = 'http://data.nobelprize.org/sparql?query=' + encodeURIComponent(query) + '&format=json';

    React.useEffect(() => {
        axios.get(queryUrl)
            .then(res => {
                console.log("categoryCount")
                let values = [];
                let countries = [];

                const bindings = res.data.results.bindings;

                bindings.forEach(a => {
                    values.push(a.count.value);
                    countries.push(a.l.value)
                })
                const aa = {
                    data: {
                        labels: countries,
                        series: [values]
                    },
                }
                setResponseData(aa)
            })
            .catch(err => {
                console.log(err);
            })
    }, [queryUrl]);

    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <GridItem xs={12} sm={12} md={8} onClick={() => setShowModal(true)}>
                {responseData &&
                <Card chart>
                    <CardHeader color="danger">
                        <ChartistGraph
                            className="ct-chart"
                            data={responseData.data}
                            type="Bar"
                            options={chartOptions.options}
                            responsiveOptions={chartOptions.responsiveOptions}
                            listener={chartOptions.animation}
                        />
                    </CardHeader>
                    <CardBody>
                        <h4 className={classes.cardTitle}>Prices winners by cathegory</h4>
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                        </div>
                    </CardFooter>
                </Card>
                }
            </GridItem>
            <Modal query={query} showModal={showModal} setShowModal={setShowModal}/>
        </>
    )
}

export default CategoryChart;