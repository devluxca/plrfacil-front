<script>
  import { Row, Col, Icon } from 'sveltestrap'

  let inputType = 'password'
  const toggleInput = {
    'password': 'text',
    'text': 'password'
  }
  const togglePassword = () => {
    inputType = toggleInput[inputType]
  }

  const onSubmit = (e) => {
    const email = e.target[0].value
    const password = e.target[1].value
    const rememberMe = e.target[2].value

    
  }

</script>

<main>
  <Row>
    <Col md={6}>
      <section class="container-login">
        <header>
          <h1>Bem vindo</h1>
          <small>Por favor, preencha suas credenciais para ter acesso</small>  
        </header>
        <form on:submit|preventDefault={onSubmit}>
          <section class="input-group mb-input">
            <label for="email">Email</label>
            <input id="email" placeholder="Digite seu email" />  
          </section>

          <section class="input-group">
            <label for="password">Senha</label>
            <input id="password" placeholder="**********" type={inputType} />
            <div class="eye-icon" on:click={togglePassword}>
              <Icon name={inputType === 'password' ? 'eye' : 'eye-slash'} />
            </div>
          </section>
          
          <section class="texts mb-input">
            <label class="checkbox">
              <input type="checkbox" />
              <div class="square"></div>
              <small>Lembrar de mim</small>
              <div class="icon-check">
                <Icon name="check" />
              </div>
            </label>

            <small class="text-blue clickable">Esqueci minha senha</small>
          </section>

          <button>Login</button>

          <small class="dont-have-account">Não tem uma conta? <span class="text-blue">Crie uma</span></small>
        </form>
      </section>
    </Col>
    <Col md={6}>
      <section class="background">
        <img src="/images/logo-white.svg" alt="PLR Facil logo" />
      </section>
    </Col>
  </Row>
</main>

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
    border: 1px solid var(--plrfacil-dark);
    border-radius: 5px;
    margin-right: 5px;
  }
  .checkbox {
    position: relative;
    display: flex;
    cursor: pointer;
  }
  .clickable {
    cursor: pointer;
  }

  .texts {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  button {
    opacity: 0.8;
    border: none;
    background: var(--plrfacil-blue);
    color: var(--plrfacil-white);
    border-radius: 4px;

    padding: 10px;

    font-size: 22px;
    font-weight: 500;
    font-family: 'Roboto';
    line-height: 26px;
  }
  button:hover {
    opacity: 1;
  }

  .eye-icon {
    position:absolute;
    right: 15px;
    bottom: 3px;
    font-size: 22px;
    cursor: pointer;
  }

  .dont-have-account {
    text-align: center;
    margin-top: 25px;
  }
  .text-blue {
    color: var(--plrfacil-blue);
  }

  h1 {
    margin: 0px;
    font-family: 'Roboto';
    font-weight: 600;
    font-size: 42px;
  }
  small {
    font-family: 'Roboto';
    font-size: 16px;
    color: rgba(0, 0, 0, 0.7);
  }

  input {
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
  .mb-input {
    margin-bottom: 35px;
  }

  form {
    width: 100%;
    max-width: 410px;
    display: flex;
    flex-direction: column;
  }

  header {
    width: 100%;
    max-width: 410px;
    margin-bottom: 40px;
  }

  .input-group label {
    font-family: 'Poppins';
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .container-login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    height: 100vh;
  }

  .background {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--plrfacil-dark);
  }
  .background img {
    max-width: 360px;
    max-height: 252px;
  }
</style>
