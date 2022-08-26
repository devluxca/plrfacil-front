<script>
    import { createForm } from 'svelte-forms-lib'
    import { pipe, pluck, zipObj, find, map, propOr, filter, ifElse, has } from 'ramda'
  
    export let id
    export let inputs
    export let style
  
    export let onSubmit
  
    const initialValueType = (inputs) => pipe(
      (label) => find(inp => inp.label === label)(inputs),
      ifElse(
        has('isFile'),
        () => null,
        propOr('', 'initial'),
      ),
    )
  
    const getInitialValues = (inputs) =>
      zipObj(pluck('label')(inputs), map(initialValueType(inputs))(pluck('label')(inputs)))
  
    const validate = (inputs) => async (values) => {
      const validators = filter(has('validator'))(inputs)
      const errors = []
  
      // eslint-disable-next-line no-loops/no-loops
      for (const inp of validators) {
        try {
          await inp.validator(values)
        } catch (err) {
          // eslint-disable-next-line immutable/no-mutation
          errors[inp.label] = err.message
        }
      }
  
      return errors
    }
    
    const { form, errors, handleChange, handleSubmit, updateField, updateValidateField } = createForm({
      initialValues: getInitialValues(inputs),
      validate: validate(inputs),
      onSubmit,
    })
  </script>
  
  <form {id} on:submit={handleSubmit} {style}>
    <slot form={$form} errors={$errors} {handleChange} {updateField} {updateValidateField} />
  </form>