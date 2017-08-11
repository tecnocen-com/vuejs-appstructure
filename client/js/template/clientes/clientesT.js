module.exports = `
    <div class="col-sm-12">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <h5 class="panel-title">Clientes</h5>
                <div class="heading-elements">
                    <ul class="icons-list">
                        <li><a data-action="collapse"></a></li>
                    </ul>
                </div>
            </div>
            <div class="panel-body">
                <p class="content-group">
                
                </p>
                <mcdatatable :title="'Clientes'" :config="config.grid"></mcdatatable>
            </div>
        </div>
    </div>
`;