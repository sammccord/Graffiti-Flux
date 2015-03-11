var Graffiti = function(api) {
    //Host URL for JSON rest API
    this.api = api;
};

Graffiti.prototype.Page = function() {
    var self = this;
    return {
        getAggregate:function(args,callback){
            console.log('API',{_ids:args._ids});
            $.ajax({
                type: "POST",
                url: self.api + '/api/g/'+args.ref,
                data: {'_ids[]':args._ids},
                success: function(data) {
                    console.log('GET FEED SUCCESS',data);
                    callback(null, data)
                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    callback(err.toString())
                },
                dataType: 'json'
            });
        },
        GET: function(args, callback) {
            //args.domain
            console.log('GETTING PAGE',args);
            var params = '';
            if (args.id) {
                params += '?id=' + args.id
            }
            $.ajax({
                url: self.api + '/api/org/' + args.organization_id +'/page/'+args.page+ params,
                dataType: 'json',
                success: function(data) {
                    console.log('GET PAGE SUCCESS',data);
                    callback(null, data)
                },
                error: function(xhr, status, err) {
                    // console.error(status, err.toString());
                    callback(err.toString())
                }
            });

        },
        POST: function POST(args,callback) {
            console.log(args);
            //args['_ids[]'] = args._ids;
            //args['names[]'] = args.names;
            $.ajax({
                type: "POST",
                url: self.api + '/api/pages/',
                data: args,
                success: function(data) {
                    console.log('POST PAGE SUCCESS',data);
                    callback(null, data)
                },
                error: function(xhr, status, err) {
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
};

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
                    console.log('POST SPRAY FAIL',arguments);
                    callback(err);
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
                    console.log('POST COMMENT SUCCESS',data);
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
};

Graffiti.prototype.Organization = function() {
    var self = this;
    return {
        GET: function(args, callback) {
            //args.domain
            console.log('GETTING ORG',args);
            $.ajax({
                url: self.api + '/api/organizations/code/' + args.code,
                dataType: 'json',
                success: function(data) {
                    console.log('GET PAGE SUCCESS',data);
                    callback(null, data)
                },
                error: function(xhr, status, err) {
                    // console.error(status, err.toString());
                    callback(err.toString())
                }
            });

        },
        getFeed:function(args,callback){
            console.log('API',{_ids:args._ids});
            $.ajax({
                type: "POST",
                url: self.api + '/api/organizations/feed',
                data: {'_ids[]':args._ids},
                success: function(data) {
                    console.log('GET FEED SUCCESS',data);
                    callback(null, data)
                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    callback(err.toString())
                },
                dataType: 'json'
            });
        }

    }
};
