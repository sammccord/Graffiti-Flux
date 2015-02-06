var Graffiti = function(api) {
    //Host URL for JSON rest API
    this.api = api;
}

Graffiti.prototype.Page = function() {
    var self = this;
    return {
        GET: function(args, callback) {
            //args.domain
            var params = ''
            if (args.id) {
                params = '?id=' + args.id
            }
            $.ajax({
                url: self.api + '/api/pages/' + args.page + params,
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    callback(null, data)
                },
                error: function(xhr, status, err) {
                    // console.error(status, err.toString());
                    callback(err.toString())
                }
            });

        },
        POST: function POST(args,callback) {
            $.ajax({
                type: "POST",
                url: self.api + '/api/pages/',
                data: args,
                success: function(data) {
                    callback(null, data)
                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    callback(err.toString())
                },
                dataType: 'json'
            });
        },
        UPDATE: function UPDATE() {

        },
        DELETE: function DELETE() {

        }
    }
}

Graffiti.prototype.Spray = function() {
    var self = this;
    return {
        GET: function GET(args, callback) {
            console.log(args._id);
            $.ajax({
                url: self.api + '/api/sprays/' + args.id,
                dataType: 'json',
                success: function(data) {
                    callback(null, data)
                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    callback(err.toString())
                }
            });
        },
        POST: function POST(args, callback) {
            $.ajax({
                type: "POST",
                url: self.api + '/api/sprays/',
                data: args,
                success: function(data) {
                    callback(null, data)
                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    callback(err.toString())
                },
                dataType: 'json'
            });

        },
        UPDATE: function UPDATE() {

        },
        DELETE: function DELETE() {

        }
    }
}

Graffiti.prototype.Comment = function() {
    var self = this;
    return {
        GET: function GET(args, callback) {

        },
        POST: function POST(args, callback) {
            $.ajax({
                type: "POST",
                url: self.api + '/api/comments/',
                data: args,
                success: function(data) {
                    console.log(data);
                    callback(null, data)
                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    callback(err.toString())
                },
                dataType: 'json'
            });

        },
        UPDATE: function UPDATE() {

        },
        DELETE: function DELETE() {

        }
    }
}
