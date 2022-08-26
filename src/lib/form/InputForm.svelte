<script>
    import { imask } from '@imask/svelte'
    import { isNil } from 'ramda'
    import MsgError from './MsgError.svelte'
  
    export let title
    export let type = 'text'
    export let placeholder = ''
    export let label
    export let form
    export let handleChange
    export let errors
    export let mask
    export let value

    export let spacing = false
  
  </script>
  
  <div 
  class="input-group"
  class:error={!!errors[label]}
  class:spacing
  >
    {#if title}
      <label for={label}>{title}</label>
    {/if}
    <div class="input-group-icon">
      <input
        id={label}
        name={label}
        {type}
        {placeholder}
        value={value ?? form[label]}
        on:change={handleChange}
        use:imask={mask}
  
        class:error={!!errors[label]}
      />
      <slot name="icon" />
    </div>
    <MsgError {errors} {label} />
  </div>
  
<style>
  .input-group-icon {
    position: relative;
    width: 100%;
    display: flex;
  }
  .input-group label {
    font-family: 'Poppins';
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .input-group.error input {
    border: 1px solid var(--plrfacil-red);
  }

  input {
    width: 100%;
    height: 42px;
    border: 1px solid #3A61C7;
    border-radius: 4px !important;

    color: var(--plrfacil-dark);

    padding: 15px 10px;
  }

  input:focus {
    outline: none;
    border: 2px solid #3A61C7;
  }

  .input-group {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .spacing {
    margin-bottom: 20px;
  }
</style>