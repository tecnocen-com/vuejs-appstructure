module.exports = `
    <div v-if="config.active" class="alert-message-overlay alert-overlay-custom">
        <div class="loader-custom-container container">
            <b><span class="glyphicon glyphicon-repeat loading-anim"></span><br>
            {{config.message}}</b>
        </div>
    </div>
`;