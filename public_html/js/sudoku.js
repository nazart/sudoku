var Sudoku = (function ($) {
    var game = new game();
    this.$input={};
    return {
        getInput:function(){
            return $input;
        },
        getTable: function () {
            var $td, $tr, $table = $('<table>');
            for (var x = 0; x < 9; x++) {
                $tr = $('<tr>');
                $input[x] = {};
                for (var y = 0; y < 9; y++) {
                    seccionX = Math.floor(x / 3);
                    seccionY = Math.floor(y / 3);
                    $input[x][y] = $('<input type="text">')
                            .attr('row', x)
                            .attr('col', y)
                            .attr('maxlength', 1)
                            ;
                    $input[x][y].on('keyup', $.proxy(game.validate, game));
                    $td = $('<td>').append($input[x][y]);

                    if ((seccionX + seccionY) % 2 === 0) {
                        $td.addClass('grupoOscuro');
                    } else {
                        $td.addClass('grupoClaro');
                    }
                    $tr.append($td);
                }
                $table.append($tr);
            }
            return $table;
        },
        randonValues: function ($input) {
            for (var x = 0; x < 10; x++) {
                this.addValuesRandon($input)
            }
        },
        addValuesRandon: function ($input) {
            var randx = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
            var randy = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
            var randNum = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
            
            if (game.validateColumn(randx, randy, randNum)
                    && game.validateRow(randx, randy, randNum)
                    && game.validateGroup(randx, randy, randNum)) {
                $input[randx][randy].val(randNum);
                console.log(randx+','+randy+','+randNum);
            } else {
                console.log('no ok');
                this.addValuesRandon($input);
            }
        }
    }
    function game() {
        return {
            getValoresCorrectos: function () {
                return [1, 2, 3, 4, 5, 6, 7, 8, 9];
            },
            validateColumn: function (x, y, valorItem) {
                var result = true;
                
                //console.log('entro y:'+$(this).attr('col')+' x:'+$(this).attr('row'));
                console.log($("input[col='" + y + "']"));
                $("input[col='" + y + "']").each(function () {
                    if (!($(this).attr('col') == y &&
                            $(this).attr('row') == x)) {
                        if (valorItem == $(this).val()) {
                            result = false;
                            console.log('flase');
                            return false;
                        }else{
                            console.log('true');
                        }
                    }
                });
                return result;
            },
            validateRow: function (x, y, valorItem) {
                var result = true;
                $("input[row='" + x + "']").each(function () {
                    if (!($(this).attr('col') == y &&
                            $(this).attr('row') == x)) {
                        if (valorItem == $(this).val()) {
                            result = false;
                            return false;
                        }
                    }
                });
                return result;
            },
            validateGroup: function (x, y, value) {
                var positionY;
                var positionX;
                if (0 <= y && y <= 2) {
                    positionY = 0;
                }
                if (3 <= y && y <= 5) {
                    positionY = 3;
                }
                if (6 <= y && y <= 8) {
                    positionY = 6;
                }
                if (0 <= x && x <= 2) {
                    positionX = 0;
                }
                if (3 <= x && x <= 5) {
                    positionX = 3;
                }
                if (6 <= x && x <= 8) {
                    positionX = 6;
                }
                for (var ix = 0 + positionX; ix < 3 + positionX; ix++) {
                    for (var jy = 0 + positionY; jy < 3 + positionY; jy++) {
                            if ($("input:not([col='" + y + "'][row='" + x + "'])[col='" + jy + "'][row='" + ix + "']").val() == value) {
                                return false;
                            }
                    }
                }
                return true;
            },
            validate: function (e) {
                var x = $(e.currentTarget).attr('row');
                var y = $(e.currentTarget).attr('col');
                var input = $(e.currentTarget);
                console.log(this);
                if (input.val() != '') {
                    if (this.getValoresCorrectos().indexOf(parseInt(input.val())) < 0) {
                        input.parent().addClass('inputError');
                        return false;
                    } else {
                        if (this.validateColumn(x, y, input.val())
                                && this.validateRow(x, y, input.val())
                                && this.validateGroup(x, y, input.val())) {
                            input.parent().removeClass('inputError');
                            return true;
                        } else {
                            input.parent().addClass('inputError');
                            return false;
                        }
                    }
                }
            }
        }
    }
})(jQuery);

//Sudoku.getTable();
$(document).ready(function () {
    $('#contenido').html(Sudoku.getTable());
   
    Sudoku.randonValues(Sudoku.getInput());
});