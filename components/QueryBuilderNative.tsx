import {
  QueryBuilderProps,
  RuleGroupType,
  RuleGroupTypeIC,
  useQueryBuilder,
} from "react-querybuilder";
import { RuleGroupNative } from "./RuleGroupNative";

export const QueryBuilderNative = <
  RG extends RuleGroupType | RuleGroupTypeIC = RuleGroupType
>(
  props: QueryBuilderProps<RG>
) => {
  const qb = useQueryBuilder(props);

  if (props.controlElements?.rule) {
    qb.schema.controls.rule = props.controlElements.rule;
  }

  if (props.controlElements?.ruleGroup) {
    qb.schema.controls.ruleGroup = props.controlElements.ruleGroup;
  }

  return (
    <RuleGroupNative
      ruleGroup={qb.query}
      path={[]}
      translations={qb.translations}
      schema={qb.schema}
      actions={qb.actions}
    />
  );
};
