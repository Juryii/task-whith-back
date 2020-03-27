<script>
import { mergeData } from "vue-functional-data-merge";

export default {
  name: "SvgIcon",
  functional: true,
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: null
    },
    desc: {
      type: String,
      default: null
    },
    viewBox: {
      type: String,
      default: null,
      validator(value) {
        return value.split(" ").every(v => {
          return !isNaN(parseInt(v));
        });
      }
    }
  },
  render(h, { props, data }) {
    let icon = require(`@/assets/icons/${props.name}.svg`);
    if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
      icon = icon.default;
    }

    const use = h("use", {
      attrs: {
        // Since SVG 2, the xlink:href attribute is deprecated in favor of simply href.
        href: icon.url,
        // xlink:href can still be required in practice for cross-browser compatibility.
        "xlink:href": icon.url
      }
    });

    const title = props.title ? h("title", props.title) : null;
    const desc = props.desc ? h("desc", props.desc) : null;
    const componentData = {
      class: 'svg-icon svg-icon--' + props.name,
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: props.viewBox
      }
    };

    return h(
      "svg",
      mergeData(data, componentData),
      [title, desc, use].filter(Boolean)
    );
  }
};
</script>
