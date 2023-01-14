import { Picker } from "@react-native-picker/picker";
import { StyleSheet, TextInput, View } from "react-native";
import { Field, Operator, RuleProps, useRule } from "react-querybuilder";

const styles = StyleSheet.create({
  rule: {
    flexDirection: "row",
  },
    textInput: {
      borderWidth: 1,
    },
  
});

export const RuleNative = (props: RuleProps) => {
  const r = { ...props, ...useRule(props) };

  return (
    <View style={styles.rule}>
      <Picker
        selectedValue={r.rule.field}
        onValueChange={(v) => r.generateOnChangeHandler("field")(v)}
      >
        {(r.schema.fields as Field[]).map((f) => (
          <Picker.Item key={f.name} value={f.name} label={f.label} />
        ))}
      </Picker>
      <Picker
        selectedValue={r.rule.operator}
        onValueChange={(v) => r.generateOnChangeHandler("operator")(v)}
      >
        {(r.schema.getOperators(r.rule.field) as Operator[]).map((op) => (
          <Picker.Item key={op.name} value={op.name} label={op.label} />
        ))}
      </Picker>
      <TextInput
        style={styles.textInput}
        value={r.rule.value}
        onChangeText={(t) => r.generateOnChangeHandler("value")(t)}
      />
    </View>
  );
};
