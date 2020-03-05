<template>
  <div class="login">
    <div class="illustration"></div>
    <div class="content">
      <div class="box">
        <div class="middle">
          <img class="brand" src="../../assets/illustrations/brand2.svg" alt="Brand"/>
          <h1 class="welcome">Welcome</h1>
          <p class="message">
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet.
          </p>
          <button class="auth" @click="authenticate('oauth2')">
            Login
          </button>
          <p>
            Ainda não possui um conta? <a href="#" target="_blank">Cadastre-se</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    methods: {
      authenticate: function (provider) {
        this.$auth.authenticate(provider)
          .then(() => {
            console.log(this.$auth.isAuthenticated());
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  .login {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    position: fixed;

    @media (min-width: 600px) {
      flex-direction: row;
      align-items: stretch;
    }

    .illustration,
    .content {
      position: relative;
      @media (min-width: 600px) {
        flex: 0 0 50%;
        max-width: 50%;
      }
    }

    .illustration {
      width: 100%;
      position: relative;
      background: #111 url("../../assets/illustrations/2499813.svg") {
        repeat: no-repeat;
        position: center;
        size: 70%;
      };
      flex-grow: 1;
    }

    .content {
      background: #111111;

      .box {
        margin: 1%;
        width: 98%;
        height: 98%;
        background: white;
        border-radius: 25px;
        display: flex;
        justify-content: center;
        align-items: center;

        .middle {
          text-align: center;

          .brand {
            margin: auto {
              top: 20px
            };
            width: 180px;
            display: block;
          }

          .welcome {
            margin: 0 {
              top: 20px;
            };
            font-weight: bold;
            font-size: 3rem;
          }

          .message {
            margin: 0 10% 40px 10%;
          }

          .auth {
            display: inline-block;
            line-height: 1.5;
            color: white;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-color: #111111;
            border: 1px solid transparent;
            padding: 0.5rem 7rem 0.5rem 2rem;
            font-size: 1rem;
            font-weight: bold;
            border-radius: 0.25rem;
            position: relative;

            &:after {
              top: 50%;
              right: 2rem;
              margin-top: -17.5px;
              width: 35px;
              height: 35px;
              background: url("../../assets/illustrations/right-arrow.svg") {
                repeat: no-repeat;
                position: center;
                size: 100%;
              };
              content: '';
              position: absolute;
            }

            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
