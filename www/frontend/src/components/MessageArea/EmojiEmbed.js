import Quill from 'quill';
const InlineEmbed = Quill.import('blots/embed');

class EmojiEmbed extends InlineEmbed {
  static create(value) {
    let node = super.create();

    node.dataset.name = value;
    node.innerText = ` :${value}: `;
    return node;
  }
  static value(node) {
    return node.dataset.name;
  }
}
EmojiEmbed.blotName = 'emoji';
EmojiEmbed.tagName = 'span';
EmojiEmbed.className = 'quill-emoji';

export default EmojiEmbed;
