import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SearchBar } from "../../components";

const SearchInfo = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />
      </View>
    </View>
  );
};
export default SearchInfo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 24,
    alignItems: "center",
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    position: "absolute",
    top: 0,
    zIndex: 1000,
    right: 0,
    left: 0,
    backgroundColor: '#000000',
  },
});