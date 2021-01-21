import React from 'react';
import ChartistGraph from "react-chartist";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import Modal from "../Modal/modal";

const useStyles = makeStyles(styles);



const pieChart = {
    options: {
        high: 1000,
        donut: false,
    },
    responsiveOptions: [
        [
            "screen and (max-width: 1640px)",
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
            if (data.type === "pie") {
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

const SexRations = () => {
    const classes = useStyles();

    let [responseData, setResponseData] = React.useState({})
    const query = `
    PREFIX nobel: <http://data.nobelprize.org/terms/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        SELECT (COUNT(?label) AS ?count)
        WHERE { 
          ?laur rdf:type nobel:Laureate . 
          ?laur rdfs:label ?label . 
          ?laur foaf:gender ?g .
        }
        GROUP BY ?g
    `;

    const queryUrl = 'http://data.nobelprize.org/sparql?query=' + encodeURIComponent(query) + '&format=json';
    React.useEffect(() => {
        axios.get(queryUrl)
            .then(res => {
                console.log("sexRatio")
                const male = res.data.results.bindings[0].count.value;
                const female = res.data.results.bindings[1].count.value;
                const sexRatio = {
                    series: [
                        {
                            value: male,
                            name: "male"
                        },
                        {
                            value: female,
                            name: "female"
                        },

                    ]
                };
                setResponseData(sexRatio)
            })
            .catch(err => {
                console.log(err);
            })
    }, [queryUrl]);

    const [showModal, setShowModal] = React.useState(false);


    return (
        <>
            <GridItem xs={12} sm={12} md={4} onClick={() => setShowModal(true)}>
                {responseData &&
                <Card chart>
                    <CardHeader color="warning">
                        <h4 className={classes.cardTitleWhite}>Male to female ratio</h4>
                        <p className={classes.cardCategoryWhite}>

                        </p>
                    </CardHeader>
                    <CardBody>
                        <ChartistGraph
                            data={responseData}
                            type="Pie"
                            options={pieChart.options}
                            style={{padding: "30px"}}
                        />
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

export default SexRations;