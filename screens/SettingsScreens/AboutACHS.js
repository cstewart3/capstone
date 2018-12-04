import React, { Component } from 'react';
import { 
    View, 
    Text,
    ScrollView, 
    FlatList,
    StyleSheet, 
    TouchableHighlight, 
    
    } from 'react-native'
import { Button } from 'react-native-elements';

class AboutACHS extends Component {

    render() {
        return (

            <ScrollView>
                <Text style = {{
                    fontWeight: 'bold', 
                    fontSize: 25, 
                    fontFamily: 'Times New Roman',
                    textAlign: 'center',
                    color: 'white', 
                    backgroundColor: '#A62E20',
                    paddingBottom: 10,
                    paddingTop: 10,
                    
                    }}>
                    Who we are
                </Text>
                <Text style = {{
                  fontSize: 20,
                  paddingBottom: 20,
                  paddingTop: 10,
                  fontFamily: 'Times New Roman',
                  textAlign: 'center',
                }}>

                The Adams County Historical Society has often been referred 
                to affectionately as the "county's attic"—an archive and museum 
                preserving the rich cultural heritage of Adams County, Pennsylvania.   
                </Text>


                <Text style = {{
                    fontWeight: 'bold', 
                    fontSize: 25, 
                    fontFamily: 'Times New Roman',
                    textAlign: 'center',
                    color: 'white', 
                    backgroundColor: '#A62E20',
                    paddingBottom: 10,
                    paddingTop: 10,
                    }}>
                    Mission
                </Text>
                <Text style = {{
                  fontSize: 20,
                  paddingBottom: 20,
                  paddingTop: 10,
                  fontFamily: 'Times New Roman',
                  textAlign: 'center',
                }}>

                Our mission is to "foster interest in the history of Adams County 
                and vicinity, conduct research, preserve records and objects, 
                mark sites, and pursue such activities as may be related to the 
                history of the community."   
               
                </Text>

                <Text style = {{
                    fontWeight: 'bold', 
                    fontSize: 25, 
                    fontFamily: 'Times New Roman',
                    textAlign: 'center',
                    color: 'white', 
                    backgroundColor: '#A62E20',
                    paddingBottom: 10,
                    paddingTop: 10,
                    }}>
                    What We Offer
                </Text>
                <Text style = {{
                  fontSize: 20,
                  paddingBottom: 20,
                  paddingTop: 10,
                  fontFamily: 'Times New Roman',
                  textAlign: 'center',
                }}>

                The Society offers twenty-one hours of public operation 
                utilizing paid and volunteer staff to serve researchers at its 
                headquarters at the Wolf House on the campus of the Lutheran 
                Theological Seminary in Gettysburg.    
               
                </Text>

                <Text style = {{
                    fontWeight: 'bold', 
                    fontSize: 25, 
                    fontFamily: 'Times New Roman',
                    textAlign: 'center',
                    color: 'white', 
                    backgroundColor: '#A62E20',
                    paddingBottom: 10,
                    paddingTop: 10,
                    }}>
                    To Learn More:
                </Text>

                <Text style = {{
                  fontSize: 20,
                  paddingBottom: 20,
                  paddingTop: 10,
                  fontFamily: 'Times New Roman',
                  textAlign: 'center',
                }}>

                Links:   
               
                </Text>

                
            </ScrollView>


        );
    }
}

export default AboutACHS;
