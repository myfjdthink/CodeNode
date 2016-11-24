/**
 * Created by nick on 16/7/19.
 *
 *
 *
 * 文档说明
 * 目前支持的属性有
 * date   日期格式  为了方便日期格式的绑定 需要升级angular 1.5.0-rc.2
 * boolean  是/否
 * text 文本输入框
 * textarea 多行文本编辑
 * select  选择框
 *  options: [
 {value: 'android', name: ' android'},
 {value: 'ios', name: 'ios'}
 ]
 *
 * 不需要在页面展示的属性 请设置 isHide=true
 *
 * 页面的标题设置在 model 的 title 属性上.
 */

var _ = require('lodash')
var path = require('path')
module.exports = {
  parsePropertys: parsePropertys,
  /**
   * sails 对 attributes 里的字段有严格的限制, 无法添加我们的自定义字段,所以就这样绕过去吧.
   * @param model
   * @returns {*}
   */
  fixModel: function (model) {
    model.attributesCRUD = _.cloneDeep(model.attributes)
    var values = _.values(model.attributes);
    _.each(values, function (value) {
      //console.log('name', value.name);
      delete value.name
      delete value.isHide
      delete value.readOnly
      delete value.textarea
      delete value.image
      delete value.attributes
      delete value.options
    });
    return model
  },

  extendController: function (controller) {

    function render(view, req, res) {
      var modelName = req.route.path.split('/')[1];

      console.log('req.route.path', req.route.path);
      console.log('controller', modelName);

      requireModel(modelName, function (err, Model) {
        if (!Model.attributesCRUD) {
          res.send('请先使用 crud extend model ')
        }
        var locals = {
          title: Model.title || 'CRUD',
          sort: Model.sort || 'id desc',
          limit: Model.limit || 500,
          // populate: Model.populate,
          modelName: modelName,
          accessControl: req.session.accessControl,
          propertys: parsePropertys(Model.attributesCRUD)
        };
        res.view(view, locals, function (err, html) {
          res.send(err || html);
        });
      })
    }

    return _.extend(controller, {
      crud: function (req, res) {
        var view = 'koala/crud';
        render(view, req, res)
      },
      crud_s: function (req, res) {
        var view = 'koala/crud_s';
        render(view, req, res)
      }
    })
  }
};
var glob = require("glob")
function requireModel(name, cb) {
  var url = process.cwd() + '/api/models/*.js';
  glob(url, {nocase: false}, function (er, files) {
    var match = _.find(files, function (file) {
      var modelName = path.basename(file).split('.')[0].toLowerCase()
      return modelName === name
    });
    if (!match) {
      return cb(er, {})
    }
    var model = require(match)
    cb(er, model)
  })
}

function parsePropertys(attributesCRUD) {
  var keys = _.keys(attributesCRUD)
  var propertys = []
  _.each(keys, function (key) {
    var value = attributesCRUD[key]
    var property = {
      type: value.type,
      key: key,
      name: value.name,
      image: value.image,
      readOnly: value.readOnly,
      inputType: parseInputType(value.type)
    }
    if (value.defaultsTo) {
      property.defaultsTo = value.defaultsTo
    }
    if (value.options) {
      property.inputType = 'select'
      property.options = value.options
    }
    if (value.isHide) {
      return
    }
    if (value.type === 'string' && value.textarea) {
      property.inputType = 'textarea'
      return propertys.push(property)
    }
    if (value.type === 'date') {
      property.inputType = 'date'
      return propertys.push(property)
    }
    if (value.type === 'string' || value.type === 'float') {
      return propertys.push(property)
    }
    if (value.type === 'integer') {
      return propertys.push(property)
    }
    if (value.type === 'boolean') {
      property.options = [
        {value: 'true', name: '是'},
        {value: 'false', name: '否'}
      ]
      return propertys.push(property)
    }

    if (value.type === 'object') {
      if (!_.isObject(value.attributes)) {
        return
      }
      var subValue = value.attributes
      _.each(_.keys(value.attributes), function (subKey) {
        propertys.push({
          key: key,
          subKey: subKey,
          readOnly: value.readOnly,
          image: value.image,
          name: subValue[subKey].name,
          inputType: parseInputType(subValue[subKey].type)
        })
      });
    }

    if (value.type === 'array') {
      var tem_propertys = parsePropertys(value.attributes)
      propertys.push({
        key: key,
        name: value.name,
        defaultsTo: value.defaultsTo,
        tem_propertys: tem_propertys,
        array: true
      })
    }
  });
  console.log('parsePropertys ', propertys);
  return propertys
}

/**
 * 把 model  type 转成 html 的 input type
 * @param type
 * @returns {*}
 */
function parseInputType(type) {
  if (type === 'string') {
    return 'text'
  }
  if (type === 'date') {
    return 'date'
  }
  if (type === 'integer' || type === 'float') {
    return 'number'
  }
  if (type === 'boolean') {
    return 'select'
  }
  return 'text'
}
