// eslint-disable-next-line no-use-before-define
import React from "react"
import { Col, Grid, Row, Text } from "@components/defaults"

export const BadgesTab = ({ activeTab, setActiveTab }) => {
    return (
        <Grid
            style={{
                margin: "auto",
                width: "100%"
            }}
            className="w-full"
        >
            <Row
                size="auto"
                style={{
                    margin: "auto",
                    justifyContent: "center"
                }}
                className=""
            >
                {[
                    {
                        name: "Up for Grabs"
                    },

                    {
                        name: "Owned"
                    }
                ].map((tab, index) => {
                    return (
                        <Col
                            style={{
                                textAlign: "center",
                                borderBottom: "2px solid",
                                borderColor:
                                    activeTab === index ? "#3880ff" : "#c4c4c4",
                                padding: "5px 3%",
                                cursor: "pointer",
                                transit: "all 0.3s ease-in-out"
                            }}
                            key={index}
                            onClick={() => {
                                setActiveTab(index)
                            }}
                        >
                            <Text
                                color={activeTab === index ? "primary" : "dark"}
                            >
                                <p
                                    style={{
                                        transit: "all 0.3s ease-in-out"
                                    }}
                                >
                                    {tab.name}
                                </p>
                            </Text>
                        </Col>
                    )
                })}
            </Row>
        </Grid>
    )
}
export default BadgesTab
