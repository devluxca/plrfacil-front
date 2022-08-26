<script>
    import { Row, Col, Icon } from 'sveltestrap'
    import { Form, InputForm } from '@lib/form'
  
    import { hasUniqueEmail, isValidPassword, isFullName } from '@utils/validations'
    import { toLogin } from '@utils/routes'
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
        title: 'Nome completo',
        label: 'name',
        validator: ({ name }) =>
          isFullName(name)
      },
      {
        title: 'Email',
        label: 'email',
        validator: ({ email }) =>
          hasUniqueEmail(email, 'Email é obrigatório', 'Digite um email válido', 'O email já esta em uso')
      },
      {
        title: 'Senha',
        label: 'password',
        validator: ({ password }) => {
          isValidPassword(password)
        }
      },
    ]
  
    const onSubmit = async (json) => {
      const token = await client('/register', {
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
            <h1>Cadastre-se</h1>
            <small>Preencha suas credenciais para criar uma conta</small>  
          </header>
          <Form 
            id="form-login"
            style="width: 100%;max-width: 410px;display: flex;flex-direction: column;"
            {inputs}
  
            let:form
            let:errors
            let:handleChange
  
            {onSubmit}
          >
  
            <InputForm 
              {form}
              {errors}
              {handleChange}
              placeholder="Seu nome completo"
              spacing={true}
              title={inputs[0].title}
              label={inputs[0].label}
            />
  
            <InputForm 
              {form}
              {errors}
              {handleChange}
              placeholder="Digite um nome de usuário"
              spacing={true}
              title={inputs[1].title}
              label={inputs[1].label}
            />

  
            <InputForm 
              {form}
              {errors}
              {handleChange}
              type={inputType !== 'password' ? 'text' : 'password'}
              placeholder={inputType === 'password' ? "************" : 'Digite sua senha'}
              title={inputs[2].title}
              label={inputs[2].label}
            >
              <div slot="icon" class="eye-icon" on:click={togglePassword}>
                <Icon name={inputType === 'password' ? 'eye' : 'eye-slash'} />
              </div>
            </InputForm>
        
  
            <button>Criar conta</button>
  
            <small class="dont-have-account">Já tem uma conta? <span class="text-blue clickable" on:click={toLogin}>Faça Login</span></small>
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
    .clickable {
      cursor: pointer;
    }
    .rocket {
      position: absolute;
      bottom: 0px;
      left: -240px;
    }
  
    button {
      margin-top: 35px;
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
  