const cardsContainer = document.querySelector('.gallery');
const cardTemplate = document.querySelector('.card-template').content;

const commentTemplate = document.querySelector('.comment-template').content;
const commentContainer = document.querySelector('.lightbox__comments-box');

const lightbox = document.querySelector('.lightbox');
const imageLightbox = document.querySelector('.lightbox__image');
const lightboxCloseBtn = document.querySelector('.lightbox__close-btn');
const lightboxLikeBtn = document.querySelector('.lightbox__like-btn');
const commentForm = document.querySelector('.form__comment');
const textareaCommentText = document.querySelector('.form__textarea');
const noCommentsBlock = document.querySelector('.no-comments');

function likeToItem() {
  lightboxLikeBtn.classList.toggle('lightbox__like-btn_active');
}

function deleteLikeToItem() {
  lightboxLikeBtn.classList.remove('lightbox__like-btn_active');
}

function renderNotComment() {
  noCommentsBlock.classList.remove('no-comments_hidden');
}

function renderHasComment() {
  noCommentsBlock.classList.add('no-comments_hidden');
}

function checkComment() {
  const comments = commentContainer.querySelectorAll('.comment');
  if(Array.from(comments).length !== 0) {
    renderHasComment();
  } else {
    renderNotComment();
  }
}

function composeComment(text) {
  const comment = commentTemplate.cloneNode(true);
  const commentText = comment.querySelector('.comment__text');
  commentText.textContent = text;
  return comment;
}

function closeClickOverlay(event) {
  if (!(event.target.closest('.lightbox__container'))) {
    if (lightbox.classList.contains('lightbox_opened')) {
      closeLightbox();
    }
  }
}

function addComment(event) {
  event.preventDefault();
  const commentText = textareaCommentText.value;
  const newComment = composeComment(commentText)
  commentContainer.prepend(newComment);
  commentForm.reset();
  renderHasComment();
}

function openLightbox(item) {
  const imageLink = item.link;
  imageLightbox.src = imageLink;
  lightbox.classList.add('lightbox_opened');
  document.body.classList.add('no-scroll');
  checkComment();

  lightboxLikeBtn.addEventListener('click', likeToItem);
  lightbox.addEventListener('mousedown', closeClickOverlay);
}

function closeLightbox() {
  lightbox.classList.remove('lightbox_opened');
  document.body.classList.remove('no-scroll');

  lightboxLikeBtn.removeEventListener('click', likeToItem);
  lightbox.removeEventListener('mousedown', closeClickOverlay);

  // удаление комментариев и лайка при закрытии
  deleteLikeToItem();
  const comments = commentContainer.querySelectorAll('.comment');
  Array.from(comments).forEach(item => item.remove());
}

function composeCard(item) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.addEventListener('click', function() {
    openLightbox(item);
  });
  return card;
}

function renderCards() {
  const cards = initialImages.map(composeCard);
  cardsContainer.append(...cards);
}

lightboxCloseBtn.addEventListener('click', closeLightbox);
commentForm.addEventListener('submit', addComment)

renderCards();
