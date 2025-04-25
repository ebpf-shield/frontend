import { FormInput, FormInputNumber } from "@/components/form/FormInput";
import { useFirewallRuleFormDialogContext } from "@/contexts/FirewallRuleFormDialog/useProvider";
import { RULE_MIN_PORT_RANGE, RULE_MAX_PORT_RANGE, RULE_ACTION } from "@/models/rule.model";
import { debugLog } from "@/utils/log.util";
import { getRouteApi } from "@tanstack/react-router";
import { FormEventHandler } from "react";
import { FormProvider } from "react-hook-form";
import { useFirewallRuleForm } from "../useFirewallRuleForm";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const routeApi = getRouteApi("/agents/processes/$processId");

export const InputFirewallRuleForm = () => {
  const { processId } = routeApi.useParams();
  const { setIsDialogOpen } = useFirewallRuleFormDialogContext();

  const { inputRuleFormMethods: methods, inputOnSubmit: onSubmit } = useFirewallRuleForm({
    processId: processId,
    setIsAddDialogOpen: setIsDialogOpen,
  });

  const { isValid, errors } = methods.formState;

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isValid) {
      debugLog(errors, "create firewall rule form errors");
    }

    await methods.handleSubmit(onSubmit)(e);
  };

  const inputClasses = "bg-gray-700 border-gray-600 text-white px-3 py-2 rounded";
  const labelClasses = "text-gray-300";
  const gridRowClasses = "grid grid-cols-2 gap-4 items-start";

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => handleOnSubmit(e)} className="grid gap-4 py-4">
        <div className={gridRowClasses}>
          <div className="grid gap-2">
            <FormInput
              name="saddr"
              labelProps={{
                children: "Source Address",
                className: labelClasses,
              }}
              inputProps={{
                className: inputClasses,
                placeholder: "e.g. 192.168.1.1",
              }}
            />
          </div>
          <div className="grid gap-2">
            <FormInputNumber
              name="sport"
              labelProps={{
                children: "Source Port",
                className: labelClasses,
              }}
              inputProps={{
                className: inputClasses,
                placeholder: "e.g. 433",
                min: RULE_MIN_PORT_RANGE,
                max: RULE_MAX_PORT_RANGE,
              }}
            />
          </div>
        </div>
        <div className={gridRowClasses}>
          <div className="grid gap-2">
            <Label htmlFor="protocol" className="text-gray-300">
              Protocol
            </Label>
            <select
              id="protocol"
              {...methods.register("protocol")}
              className="bg-gray-700 border-gray-600 text-white px-3 py-2 rounded"
              defaultValue=""
            >
              <option value="" disabled>
                Select protocol
              </option>
              <option value="TCP">TCP</option>
              <option value="UDP">UDP</option>
              <option value="ICMP">ICMP</option>
              <option value="ALL">ALL</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="action" className="text-gray-300">
              Action
            </Label>
            <select
              id="action"
              {...methods.register("action")}
              className="bg-gray-700 border-gray-600 text-white px-3 py-2 rounded"
              defaultValue=""
            >
              <option value="" disabled>
                Select action
              </option>
              {RULE_ACTION.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={gridRowClasses}>
          <div className="grid gap-2">
            <FormInput
              name="priority"
              labelProps={{
                children: "Priority",
                className: labelClasses,
              }}
              inputProps={{
                className: inputClasses,
                placeholder: "e.g. 100",
              }}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="comment" className="text-gray-300">
            Comment
          </Label>
          <Input
            {...methods.register("comment")}
            id="comment"
            placeholder="Rule description"
            className={inputClasses}
          />
        </div>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
          Add Rule
        </Button>
      </form>
    </FormProvider>
  );
};
