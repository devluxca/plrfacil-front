<script>
    import { Icon } from 'sveltestrap'

    export let text
    export let checked
</script>

<label class="checkbox">
    <input type="checkbox" on:change {checked} />
    <div class="square"></div>
    <small>{text}</small>
    <div class="icon-check">
      <Icon name="check" />
    </div>
</label>

<style>
    .icon-check {
      display: none;
      position: absolute;
      left: 2px;
    }
    input[type="checkbox"] {
      display: none;
    }
    input[type="checkbox"]:checked ~ .square {
      background: var(--plrfacil-blue);
      border: 1px solid var(--plrfacil-blue);
    }
    input[type="checkbox"]:checked ~ .icon-check {
      display: block;
      color: var(--plrfacil-white);
    }
    .square {
      width: 20px;
      height: 20px;
      border: 1px solid var(--checkbox-theme, var(--plrfacil-dark));
      border-radius: 5px;
      margin-right: 5px;
    }
    .checkbox {
      position: relative;
      display: flex;
      cursor: pointer;
    }
    small {
      color: var(--checkbox-theme, var(--plrfacil-dark));
    }
</style>