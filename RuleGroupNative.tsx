import { Picker } from "@react-native-picker/picker";
import { useMemo } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import { Combinator, RuleGroupProps, useRuleGroup } from "react-querybuilder";
import { RuleNative } from "./RuleNative";

interface RuleGroupStyles {
  ruleGroupHeader?: ViewStyle;
  ruleGroupBody?: ViewStyle;
  combinatorSelector?: TextStyle;
  combinatorOption?: TextStyle;
  inlineCombinator?: TextStyle;
}

type RuleGroupNativeProps = RuleGroupProps & {
  styles?: RuleGroupStyles;
};

const baseStyles: Partial<Record<keyof RuleGroupStyles, ViewStyle>> = {
  ruleGroupHeader: {
    flexDirection: "row",
  },
};

export const RuleGroupNative = (props: RuleGroupNativeProps) => {
  const rg = { ...props, ...useRuleGroup(props) };

  const styles = useMemo(() => ({
    ruleGroupHeader: StyleSheet.flatten([
      baseStyles.ruleGroupHeader,
      props.styles?.ruleGroupHeader,
    ]),
    ruleGroupBody: StyleSheet.flatten([
      baseStyles.ruleGroupBody,
      props.styles?.ruleGroupBody,
    ]),
    combinatorSelector: StyleSheet.flatten([
      baseStyles.combinatorSelector,
      props.styles?.combinatorSelector,
    ]),
    combinatorOption: StyleSheet.flatten([
      baseStyles.combinatorOption,
      props.styles?.combinatorOption,
    ]),
    inlineCombinator: StyleSheet.flatten([
      baseStyles.inlineCombinator,
      props.styles?.inlineCombinator,
    ]),
  }), [props.styles]);

  return (
    <View>
      <View style={styles.ruleGroupHeader}>
        <Picker
          style={styles.combinatorSelector}
          itemStyle={styles.combinatorOption}
          selectedValue={rg.combinator}
          onValueChange={(v) => rg.onCombinatorChange(v)}
        >
          {(rg.schema.combinators as Combinator[]).map(c => (
            <Picker.Item key={c.name} label={c.label} value={c.name} />
          ))}
        </Picker>
        <Button
          title={props.translations.addRule.label!}
          onPress={(e) => rg.addRule(e)}
        />
        <Button
          title={props.translations.addGroup.label!}
          onPress={(e) => rg.addGroup(e)}
        />
      </View>
      <View style={styles.ruleGroupBody}>
        {rg.ruleGroup.rules.map((r, idx) =>
          typeof r === "string" ? (
            <Text style={styles.inlineCombinator} key={rg.path.join("-")}>{r}</Text>
          ) : "rules" in r ? (
            <Text key={r.id}>RuleGroupNative goes here...</Text>
          ) : (
            <RuleNative
              key={r.id}
              rule={r}
              field={r.field}
              operator={r.operator}
              value={r.value}
              path={[idx]}
              translations={rg.translations}
              schema={rg.schema}
              actions={rg.actions}
            />
          )
        )}
      </View>
    </View>
  );
};
