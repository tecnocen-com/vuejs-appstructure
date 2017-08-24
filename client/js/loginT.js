module.exports = `
    <div class="login-box">
        <form v-on:submit.prevent action="#" method="POST">
            <div class="Logo">
                <img src="/image/logo/techfor180-45.png" alt="logotipo" class="img-responsive">
            </div>
            <div class="inner-login-box">
                <div class="header">
                    <h1 class="text-center text-uppercase">{{mainMessage.title}}</h1>
                    <h4 class="text-center">{{mainMessage.subtitle}}</h4>
                </div>
                <div class="box-login">
                    <div id="username" class="form-group">
                        <label for="username">{{user.label}}:</label>
                        <input v-on:keydown.space.prevent v-on:keydown.enter="login()" type="text" v-model="user.data" ref="username" name="username" :class="!alert.hidden && error !== 1 ? 'wrong-input' : ''" class="form-control">
                    </div>
                    <div id="password" class="form-group">
                        <label for="password">{{password.label}}:</label>
                        <input v-on:keydown.space.prevent v-on:keydown.enter="login()" type="password" v-model="password.data" ref="password" name="password" :class="!alert.hidden && error !== 0 ? 'wrong-input' : ''" class="form-control">
                    </div>
                </div>
                <div id="message" v-if="!alert.hidden" :class="[alert.animate ? animationClass[0] : animationClass[1], 'message-box', 'wrong-message-box']" role="alert">
                    <p>
                        <b>{{alert.message}}</b>
                    </p>
                </div>
                <div class="form-group" style="text-align: center;">
                    <button type="submit" :class="button.loading ? 'disabled' : ''" class="btn-black" v-on:click="login()"><b>{{button.message}}</b></button>
                </div>
            </div>
        </form>
            <div class="form-group forgotten-container">
                <small>
                    <a class="login-link" href="#" v.on:click.prevent>{{button.forgotten}}</a>
                </small>
            </div>
    </div>
`;