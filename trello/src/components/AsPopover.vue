<template>
  <component
    :is="tagName"
    :class="['as-popover', { 'as-popover--active': show }]"
  >
    <div>
      <div
        v-show="show"
        ref="popper"
        :class="[
          'as-popover__body',
          'as-popover--is-' + theme,
          bodyClass,
          { 'pa-0': noPadding }
        ]"
        :style="{ maxWidth: width }"
      >
        <slot></slot>
      </div>
      <slot name="ref"></slot>
    </div>
  </component>
</template>

<script>
import Popper from "popper.js";

const on = (element, event, handler) => {
  if (element && event && handler) {
    document.addEventListener
      ? element.addEventListener(event, handler, false)
      : element.attachEvent("on" + event, handler);
  }
};

const off = (element, event, handler) => {
  if (element && event) {
    document.removeEventListener
      ? element.removeEventListener(event, handler, false)
      : element.detachEvent("on" + event, handler);
  }
};

export default {
  name: "AsPopover",
  model: {
    event: "change"
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    bodyClass: {
      type: String,
      default: null
    },
    noPadding: {
      type: Boolean,
      default: false
    },
    tagName: {
      type: String,
      default: "div"
    },
    trigger: {
      type: String,
      default: "hover",
      validator: value => ["click", "hover"].indexOf(value) > -1
    },
    delayOnMouseOver: {
      type: Number,
      default: 10
    },
    delayOnMouseOut: {
      type: Number,
      default: 10
    },
    visibleArrow: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: "default"
    },
    placement: {
      type: String,
      default: "bottom"
    },
    offset: {
      type: [String, Number],
      default: 0
    },
    flipped: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: "auto"
    },
    appendToBody: Boolean
  },
  data() {
    return {
      referenceElm: null,
      popper: null,
      show: this.value
    };
  },

  watch: {
    value(val) {
      this.show = val;
    },
    show(value) {
      if (value) {
        if (this.popper) {
          this.popper.enableEventListeners();
        }

        this.$emit("show", true);
        this.updatePopper();
      } else {
        if (this.popper) {
          this.popper.disableEventListeners();
        }

        this.$emit("hide", false);
      }
    }
  },
  mounted() {
    this.popperElm = this.$slots.default[0].elm;
    this.referenceElm = this.$slots.ref[0].elm;

    switch (this.trigger) {
      case "click":
        on(this.referenceElm, "click", this.toggle);
        on(document, "click", this.handleDocumentClick);
        break;
      case "hover":
        on(this.referenceElm, "mouseover", this.onMouseOver);
        on(this.$refs.popper, "mouseover", this.onMouseOver);
        on(this.referenceElm, "mouseout", this.onMouseOut);
        on(this.$refs.popper, "mouseout", this.onMouseOut);
        break;
    }
  },
  destroyed() {
    this.destroyPopper();
  },
  methods: {
    toggle(event) {
      this.show = !this.show;
      this.$emit("change", this.show);
    },
    open() {
      this.show = true;
      this.$emit("change", this.show);
    },
    close() {
      this.show = false;
      this.$emit("change", this.show);
    },
    destroy() {
      if (this.popper) {
        this.popper.destroy();
      }
    },
    initPopper() {
      this.$nextTick(() => {
        if (this.appendToBody && !this.appendedToBody) {
          this.appendedToBody = true;
          document.body.appendChild(this.popperElm.parentElement);
        }

        if (this.visibleArrow) {
          this.appendArrow(this.$refs.popper);
        }

        if (this.popper && this.popper.destroy) {
          this.popper.destroy();
        }

        this.popper = new Popper(this.referenceElm, this.$refs.popper, {
          placement: this.placement,
          removeOnDestroy: true,
          modifiers: {
            offset: {
              enabled: true,
              offset: `0, ${this.offset}`
            },
            flip: {
              enabled: this.flipped
            }
          },
          onCreate: () => {
            this.$nextTick(this.updatePopper);
          }
        });
      });
    },
    destroyPopper() {
      off(this.referenceElm, "mouseover", this.onMouseOver);
      off(this.$refs.popper, "mouseover", this.onMouseOver);
      off(this.referenceElm, "mouseout", this.onMouseOut);
      off(this.$refs.popper, "mouseout", this.onMouseOut);
      off(document, "click", this.handleDocumentClick);
      this.close();
      this.destroy();
    },
    updatePopper() {
      this.popper ? this.popper.scheduleUpdate() : this.initPopper();
    },
    onMouseOver() {
      clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this.open();
      }, this.delayOnMouseOver);
    },
    onMouseOut() {
      clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this.close();
      }, this.delayOnMouseOut);
    },
    appendArrow(element) {
      const arrow = document.createElement("div");
      arrow.setAttribute("x-arrow", "");
      arrow.className = "as-popper__arrow";
      element.appendChild(arrow);
    },
    handleDocumentClick(e) {
      if (
        this.show &&
        !this.referenceElm.contains(e.target) &&
        !this.popperElm.contains(e.target)
      ) {
        this.close();
      }
    }
  }
};
</script>