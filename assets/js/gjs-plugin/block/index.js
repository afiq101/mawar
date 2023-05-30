import { createApp, h } from "vue";

import grapejs from "grapesjs";

export default grapejs.plugins.add("rs-comp", (editor, options) => {
  const { Blocks, Components } = editor;

  const defType = Components.getType("default");
  const defModel = defType.model;
  const wrapChild = "data-child";
  let appInstance = {};

  Components.addType("vue-component", {
    model: {
      toHTML(opts = {}) {
        return defModel.prototype.toHTML.call(this, {
          ...opts,
          tag: this.get("type"),
        });
      },
    },
    view: {
      tagName: "div",

      init() {
        const { model } = this;
        this.listenTo(model, "change:attributes", this.render);
        this.listenTo(model.components(), "add remove reset", this.__upRender);
      },

      getChildrenContainer() {
        const { childrenContainer } = this;
        if (childrenContainer) return childrenContainer;

        this.childrenContainer = document.createElement("childc");

        return this.childrenContainer;
      },

      createVueChildWrap() {
        return h("span", { [wrapChild]: true });
      },

      createVueEl(cmp, props) {
        return h(cmp, props, this.createVueChildWrap());
      },

      mountVue(cmp, el) {
        const elID = el.id;
        if (appInstance[elID]) appInstance[elID].unmount();

        const app = createApp(cmp);
        app.mount(el);
        appInstance[elID] = app;
      },

      render() {
        const { model, el } = this;
        this.updateAttributes();
        this.renderChildren();
        const vueEl = this.createVueEl(model.get("component"), {
          ...model.get("attributes"),
        });

        this.mountVue(vueEl, el);

        const chld = el.querySelector(`span[${wrapChild}]`);

        // If the container is found, the react component is able to render children
        if (chld) {
          const chldCont = this.getChildrenContainer();
          while (chldCont.firstChild) {
            chld.appendChild(chldCont.firstChild);
          }
        }

        return this;
      },

      __upRender() {
        clearTimeout(this._upr);
        this._upr = setTimeout(() => this.render());
      },
    },
  });
});
