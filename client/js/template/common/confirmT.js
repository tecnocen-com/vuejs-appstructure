module.exports = `
    <div v-if="config.active" class="alert-message-overlay alert-overlay-custom">
        <div class="alert-message-box alert-box-custom container">
            <div class="alert-message-title alert-title-custom">
                <h3>{{config.description.title}}</h3>
            </div>
            <p><b v-html="config.description.text"></b></p>
            <div class="alert-buttons-box">
                <a href="#" v-on:click.prevent="config.onAccept()" class="alert-message-button button btn btn-success alert-btn-customized" style="padding-top:8px;"><span>{{config.description.accept}}</span></a>
                <a href="#" v-on:click.prevent="config.active = !config.active" class="alert-message-button button btn btn-danger alert-btn-customized" style="padding-top:8px;"><span>{{config.description.cancel}}</span></a>
            </div>
        </div>
    </div>
`;