"use client";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UntitledForm() {
  const formSchema = z.object({
    "text-input-0": z
      .string()
      .min(1, { message: "This field is required" })
      .regex(/^[A-Za-z0-9 .-]+$/, "Invalid characters"),
    "text-input-1": z
      .string()
      .min(1, { message: "This field is required" })
      .regex(/^[A-Za-z0-9 .-]+$/, "Invalid characters"),
    "text-input-2": z
      .string()
      .min(1, { message: "This field is required" })
      .regex(/^[A-Za-z0-9 .-]+$/, "Invalid characters"),
    "text-input-3": z
      .string()
      .min(1, { message: "This field is required" })
      .regex(/^[A-Za-z0-9 .-]+$/, "Invalid characters"),
    "text-input-4": z
      .string()
      .min(1, { message: "This field is required" })
      .regex(/^[A-Za-z0-9 .-]+$/, "Invalid characters"),
    "submit-button-0": z.string().optional(),
    "reset-button-0": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-input-0": "",
      "text-input-1": "",
      "text-input-2": "",
      "text-input-3": "",
      "text-input-4": "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sub_name: values["text-input-0"].toUpperCase(),
          prof_name: values["text-input-1"],
          stud_name: values["text-input-2"],
          coll_roll_no: values["text-input-3"],
          uni_roll_no: values["text-input-4"],
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to generate PDF");
      }

      const blob = await res.blob();

      // trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "titlepage.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF. Check console for details.");
    }
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={onReset}
      className="space-y-8 @container w-full"
    >
      <div className="grid grid-cols-12 gap-4">
        <Controller
          control={form.control}
          name="text-input-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 @5xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Subject name:</FieldLabel>

              <Input
                key="text-input-0"
                placeholder=""
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="text-input-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 @5xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Submitted To:</FieldLabel>

              <Input
                key="text-input-1"
                placeholder=""
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="text-input-2"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Submitted By:</FieldLabel>

              <Input
                key="text-input-2"
                placeholder=""
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="text-input-3"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 @5xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">College Roll No:</FieldLabel>

              <Input
                key="text-input-3"
                placeholder=""
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="text-input-4"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 @5xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                University Roll No:
              </FieldLabel>

              <Input
                key="text-input-4"
                placeholder=""
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="submit-button-0"
          render={({ fieldState }) => (
            <Field
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start mt-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">Submit</FieldLabel>

              <Button
                key="submit-button-0"
                id="submit-button-0"
                name=""
                className="w-full"
                type="submit"
                variant="default"
              >
                Submit
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="reset-button-0"
          render={({ fieldState }) => (
            <Field
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start mt-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">Reset</FieldLabel>

              <Button
                key="reset-button-0"
                id="reset-button-0"
                name=""
                className="w-full"
                type="reset"
                variant="outline"
              >
                Reset
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </form>
  );
}
