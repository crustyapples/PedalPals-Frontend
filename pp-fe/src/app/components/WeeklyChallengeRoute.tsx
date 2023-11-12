import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView, FlatList } from "react-native";
import RouteCard from "./RouteCard";

const dummyData = [
  {
    route_difficulty: "Ring of Fire",
    route_geometry: "odgGqeywRi@e@GEmAeBs@cAm@{@uAmBEIm@aAmAsBeB}CuBeEMo@KkCLgA`@cARYLUb@g@`@[mEoHWg@Q_@Ka@Es@@u@RkAXmATw@Jk@Fw@?}AM_AKe@Sm@u@wAqBgE]q@NMh@c@pAmAx@eAp@aAl@gAbAeB|AqCJO\a@t@kAxCyENWzA{BnFwIrA{AXWz@k@l@u@H_@@_@uCwEKOh@[lBgAtCaBf@[RYN]BYC]EQiDuGYm@_AkBhAq@pBmAH]Bi@A_@gFyI_AwAGKJIxB}AdDwBJITUHI|CcDPaAAaAU[i@s@MSu@uAJGEKi@qAKS?CIa@K]MSEKWw@?IIUI[OH]Rc@NYHA@_@JC@C?WF[DYB[Ai@OMKCCQQUg@?AACK]COOm@CEAIGWACOs@ACI_@?A?AQaAIc@AAG_@AOAAMoAE[Gw@Eq@GuACSAeA@oA@q@AC?G?I?C?E@eAD???J_BLuA?C^Bx@?~AAl@?Du@ZGVuA?aC\?T_Ax@RbB^`AwDTFBWD]LgA@e@@M@U?O?G?C?{@?IBS@a@C[Ag@?QGsHM?Dm@RcATq@BEZo@d@k@@Cl@i@r@a@f@SNGz@Sl@I?WPCPAEGCEEc@CWOiA@m@GOISBI@IBGBGBGR]^g@DE@AFELMTS^Yb@[|@e@`@SFADADHTIf@If@?h@FPFFKD@ZJDBF@JFTHVF\J`@JPDJ@D?D???ENPDX_ANk@fAaCtAyCDo@EQEQGKw@u@wA_@eC_AwD_B}D_BUXIVD~@?`@KjASh@[d@w@b@[TqBl@g@RUHu@XkBxAY\_AvAk@rAs@pBwFbH}CpEq@p@yBtAs@p@e@p@e@fAUfAGfC",
    distance: 22.34,
  }
];

const WeeklyChallengeRoute: React.FC = () => {


  return (
    <View className="flex">
      <Text className="text-black font-Poppins_Bold text-2xl m-4 text-center">
        Weekly Challenge Routes
      </Text>

      <ScrollView>
        <View className="flex-row flex-wrap justify-center">
        {dummyData.map((route, index) => (
          <View style={{width:"50%"}}>
            <RouteCard key={index} {...route} />
          </View>
        ))}
        </View>
        
      </ScrollView>
    </View>
  );
};

export default WeeklyChallengeRoute;
