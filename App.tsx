import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { formatQuery, useQueryBuilder } from "react-querybuilder";
import { RuleGroupNative } from "./RuleGroupNative";

export default function App() {
  const qb = useQueryBuilder({
    // debugMode: true,
    fields: [
      { name: "firstName", label: "First Name" },
      { name: "lastName", label: "Last Name" },
    ],
    defaultQuery: { combinator: "and", rules: [
      {field:'firstName', operator: 'beginsWith', value: 'Stev'},
      {field:'lastName', operator: 'in', value: 'Vai, Vaughan'},
    ] },
  });

  return (
    <View style={styles.container}>
      <View>
        <RuleGroupNative
          ruleGroup={qb.query}
          rules={qb.query.rules}
          path={[]}
          translations={qb.translations}
          schema={qb.schema}
          actions={qb.actions}
        />
        <Text>{formatQuery(qb.query, 'sql')}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
