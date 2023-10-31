import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import MapButtons from '../components/MapButtons';
import RouteInfoPlanning from '../components/RouteInfoPlanning';
import MapViewComponent from '../components/MapViewComponent';
import polyline from '@mapbox/polyline';

const MapPage: React.FC = () => {
  const routeGeometry = "odgGqeywRi@e@GEmAeBs@cAm@{@uAmBEIm@aAmAsBeB}CuBeEMo@KkCLgA`@cARYLUb@g@`@[mEoHWg@Q_@Ka@Es@@u@RkAXmATw@Jk@Fw@?}AM_AKe@Sm@u@wAqBgE]q@NMh@c@pAmAx@eAp@aAl@gAbAeB|AqCJO\\a@t@kAxCyENWzA{BnFwIrA{AXWz@k@l@u@H_@@_@uCwEKOh@[lBgAtCaBf@[RYN]BYC]EQiDuGYm@_AkBhAq@pBmAH]Bi@A_@gFyI_AwAGKJIxB}AdDwBJITUHI|CcDPaAAaAU[i@s@MSu@uAJGEKi@qAKS?CIa@K]MSEKWw@?IIUI[OH]Rc@NYHA@_@JC@C?WF[DYB[Ai@OMKCCQQUg@?AACK]COOm@CEAIGWACOs@ACI_@?A?AQaAIc@AAG_@AOAAMoAE[Gw@Eq@GuACSAeA@oA@q@AC?G?I?C?E@eAD???J_BLuA?C^Bx@?~AAl@?Du@ZGVuA?aC\\?T_Ax@RbB^`AwDTFBWD]LgA@e@@M@U?O?G?C?{@?IBS@a@C[Ag@?QGsHM?Dm@RcATq@BEZo@d@k@@Cl@i@r@a@f@SNGz@Sl@I?WPCPAEGCEEc@CWOiA@m@GOISBI@IBGBGBGR]^g@DE@AFELMTS^Yb@[|@e@`@SFADADHTIf@If@?h@FPFFKD@ZJDBF@JFTHVF\\J`@JPDJ@D?D???ENPDX_ANk@fAaCtAyCDo@EQEQGKw@u@wA_@eC_AwD_B}D_BUXIVD~@?`@KjASh@[d@w@b@[TqBl@g@RUHu@XkBxAY\\_AvAk@rAs@pBwFbH}CpEq@p@yBtAs@p@e@p@e@fAUfAGfC"

  const [region, setRegion] = useState(null);
  const decodedCoordinates = polyline.decode(routeGeometry).map(coordinate => ({
    latitude: coordinate[0],
    longitude: coordinate[1],
  }));
  const [routeCoordinates, setRouteCoordinates] = useState([...decodedCoordinates]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  if (!region) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className='h-screen'>
      <MapViewComponent region={region} routeCoordinates={routeCoordinates} />

      <View className="absolute top-0 left-0">
        <MapButtons />
      </View>

      <View className="bottom-48 inset-x-0 absolute">
        <RouteInfoPlanning />
      </View>
    </View>
  );
};

export default MapPage;
