<script>
  import { Row, Col, Icon } from 'sveltestrap'

  import { Form, InputForm } from '@lib/form'

  import { hasEmail, hasString } from '@utils/validations'
  import { toRegister } from '@utils/routes'
  import { client } from '@utils/api'

  let inputType = 'password'
  const toggleInput = {
    'password': 'text',
    'text': 'password'
  }
  const togglePassword = () => {
    inputType = toggleInput[inputType]
  }

  const inputs = [ 
    {
      title: 'Email',
      label: 'email',
      validator: ({ email }) =>
        hasEmail(email, 'Email é obrigatório', 'Digite um email válido')
    },
    {
      title: 'Senha',
      label: 'password',
      validator: ({ password }) => {
        hasString(password, 'Senha é obrigatória')
      }
    },
    {
      title: 'Lembrar de mim',
      label: 'rememberMe',
      initial: false
    }
  ]
  const changeRememberMe = updateField => e => updateField('rememberMe', e.target.checked)

  const onSubmit = async (json) => {
    const token = await client('/login', {
      method: 'POST',
      json
    }).json()
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
          <Form 
            id="form-login"
            style="width: 100%;max-width: 410px;display: flex;flex-direction: column;"
            {inputs}
  
            let:form
            let:errors
            let:handleChange
            let:updateValidateField
  
            {onSubmit}
          >
  
            <InputForm 
              {form}
              {errors}
              {handleChange}
              placeholder="Digite um email"
              spacing={true}
              title={inputs[0].title}
              label={inputs[0].label}
            />
  
            <InputForm 
              {form}
              {errors}
              {handleChange}
              type={inputType !== 'password' ? 'text' : 'password'}
              placeholder={inputType === 'password' ? "************" : 'Digite sua senha'}
              title={inputs[1].title}
              label={inputs[1].label}
            >
              <div slot="icon" class="eye-icon" on:click={togglePassword}>
                <Icon name={inputType === 'password' ? 'eye' : 'eye-slash'} />
              </div>
            </InputForm>
            
            <section class="texts spacing">
              <label class="checkbox">
                <input type="checkbox" on:change={changeRememberMe(updateValidateField)} />
                <div class="square"></div>
                <small>Lembrar de mim</small>
                <div class="icon-check">
                  <Icon name="check" />
                </div>
              </label>
  
              <small class="text-blue clickable">Esqueci minha senha</small>
            </section>
  
            <button>Login</button>
  
            <small class="dont-have-account">Não tem uma conta? <span class="text-blue clickable" on:click={toRegister}>Crie uma</span></small>
          </Form>
        </section>
      </Col>
      <Col md={6} style="position: relative;">
        <section class="background">
          <img src="/images/logo-white.svg" alt="PLR Facil logo" />
        </section>
  
        <img src="/images/rocket-inject.svg" alt="Rocket" class="rocket" />
      </Col>
    </Row>
  </main>
  
  <style>
    .spacing {
      margin-bottom: 35px;
    }
    .rocket {
      position: absolute;
      bottom: 0px;
      left: -240px;
    }
  
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
    button:focus {
      border: none;
      outline: none;
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
  
    header {
      width: 100%;
      max-width: 410px;
      margin-bottom: 40px;
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
  