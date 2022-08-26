<script>
    export let errors
    export let label
  </script>
  
  {#if errors[label]}
    <small class="msg-error">{errors[label]}</small>
  {/if}
  
  <style>
    .msg-error {
      margin-top: 5px;
      font-family: 'Open Sans';
      font-size: 14px;
      color: var(--plrfacil-red);
    }
  </style>