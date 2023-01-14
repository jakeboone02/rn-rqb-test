import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Field, formatQuery, RuleGroupType } from "react-querybuilder";
import { QueryBuilderNative } from "./QueryBuilderNative";

const defaultQuery: RuleGroupType = {
  combinator: "and",
  rules: [
    { field: "firstName", operator: "beginsWith", value: "Stev" },
    { field: "lastName", operator: "in", value: "Vai, Vaughan" },
  ],
};

export default function App() {
  const [query, setQuery] = useState(defaultQuery);

  const fields: Field[] = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <QueryBuilderNative
          fields={fields}
          query={query}
          onQueryChange={(q) => setQuery(q)}
        />
        <Text style={styles.sql}>{formatQuery(query, "sql")}</Text>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sql: {
    maxWidth: 400,
  },
});
