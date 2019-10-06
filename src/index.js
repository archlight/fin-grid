import * as Hypergrid from 'fin-hypergrid'
import * as _ from 'underscore'
import {data, schema} from './financial-data'

var eventLoggerPlugin = require('fin-hypergrid-event-logger')


window.onload = function(){
    var fingrid = new Hypergrid({
        container: 'div#fin-grid',
        data: data, 
        schema: schema})

    console.log(fingrid)

    var freezed = []

    fingrid.properties.rowSelection = true
    fingrid.installPlugins(eventLoggerPlugin)
    fingrid.logStart()

    fingrid.properties.singleRowSelectionMode = false
    
    fingrid.setColumnProperties(fingrid.behavior.schema.shares.index, {
        editor: 'textfield',
        format: 'number',
        calculator: function(dataRow, columnName){
            return Math.floor(dataRow.delta/dataRow.spot)
        }
    })
    
    var headerRow = fingrid.behavior.columns[-2];
    //headerRow.properties.leftIcon = ''

    fingrid.behavior.dataModel.getCell = function(config, rendererName) {
        if (config.dataCell.x === -2) {
            if(freezed.indexOf(config.dataCell.y)>-1)
                config.leftIcon = ''
        }
        return config.grid.cellRenderers.get(rendererName);
    };

    fingrid.addEventListener('fin-double-click', function(e){
        const {x, y} = e.detail.dataCell
    })

    fingrid.addEventListener('fin-before-cell-edit', function(e){
        console.log(e)
    })

    fingrid.addEventListener('fin-after-cell-edit', function(e){
        const {x, y} = e.detail.primitiveEvent
        const newValue = e.detail.newValue
        const colidx = fingrid.behavior.schema.shares.index

        for(var i=0; i<fingrid.getRowCount(); i++){
            if(fingrid.getRow(i).shares)
                console.log([i, colidx])
        }
        console.log(e)

        if(newValue){
            fingrid.behavior.getColumn(colidx).setCellProperty(y-1, 'backgroundColor', 'red')
            fingrid.setValue(x, y-1, function(dataRow, columnName){return newValue})
        }else{
            fingrid.behavior.getColumn(colidx).setCellProperty(y-1, 'backgroundColor', null)
            fingrid.setValue(x, y-1, null)
        }
        fingrid.behavior.changed()
            
    })

    this.document.getElementById('freeze').addEventListener('click', function(e){
        var selected = fingrid.behavior.getSelectedRows()
        selected.forEach(function(i){
            freezed.push(i)
            headerRow.setCellProperty(i, 'leftIcon', '')
            fingrid.behavior.addRowProperties(i, {backgroundColor: '#ccffcc'})
        })
    })
}
