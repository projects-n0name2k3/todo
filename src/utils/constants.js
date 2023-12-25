export const colors = [
  "blue",
  "red",
  "green",
  "yellow",
  "cyan",
  "purple",
  "pink",
];

export const quotes = [
  {
    quote: "Cách tốt nhất để khởi đầu là ngừng nói và bắt đầu làm.",
    author: "Walt Disney",
  },
  {
    quote:
      "Người bi quan nhìn ra khó khăn trong mọi cơ hội. Người lạc quan nhìn ra cơ hội trong mọi khó khăn.",
    author: "Winston Churchill",
  },
  {
    quote: "Đừng để ngày hôm qua chiếm quá nhiều thời gian của ngày hôm nay.",
    author: "Will Rogers",
  },
  {
    quote:
      "Người ta học được từ thất bại nhiều hơn từ thành công. Bởi vậy đừng để thất bại cản đường bạn, bởi thất bại sẽ làm nên con người bạn.",
    author: "Khuyết danh",
  },
  {
    quote:
      "Vấn đề không phải là bạn có gục ngã hay không. Mà là bạn có đứng dậy sau khi ngã hay không.",
    author: "Vince Lombardi",
  },
  {
    quote:
      "Nếu bạn thực sự yêu thích điều mình làm, bạn sẽ không cần ai thúc ép bạn cả. Chính tầm nhìn sẽ đưa bạn đi.",
    author: "Steve Jobs",
  },
  {
    quote:
      "Những ai đủ điên rồ để nghĩ mình có thể thay đổi thế giới thì chính họ sẽ làm được điều đó.",
    author: "Rob Siltanen",
  },
  {
    quote:
      "Thất bại sẽ không bao giờ thắng được tôi, nếu như khao khát thành công của tôi đủ mạnh mẽ.",
    author: "Og Mandino",
  },
  {
    quote:
      "Một doanh nhân thực thụ là người có khả năng ứng biến linh hoạt trước những biến động và giảm thiểu tối đa rủi ro.",
    author: "Mohnish Pabrai",
  },
  {
    quote:
      "Bạn có thể thất bại liên tục. Nhưng tuyệt đối không được để bản thân bị đánh bại.",
    author: "Maya Angelou",
  },
  {
    quote:
      "Biết là không đủ, chúng ta phải thực hành. Mong ước thôi là không đủ, chúng ta phải hành động.",
    author: "Johann Wolfgang Von Goethe",
  },
  {
    quote:
      "Hãy tưởng tượng bạn đang có một cuộc sống hoàn hảo về mọi khía cạnh. Vậy nó sẽ như thế nào?.",
    author: "Brian Tracy",
  },
  {
    quote:
      "Nỗi sợ hãi sinh ra khi bạn ngồi chờ. Hành động là cách duy nhất để vượt qua nó.",
    author: "Henry Link",
  },
  {
    quote: "Dù bạn nghĩ rằng mình có thể hay không thể thì bạn đều đúng cả.",
    author: "Henry Ford",
  },
  {
    quote:
      "Cảm giác an toàn chỉ là một khái niệm mê tín. Cuộc sống là một cuộc phiêu lưu táo bạo hoặc là chẳng có gì cả.",
    author: "Helen Keller",
  },
  {
    quote:
      "Người có lòng tin vào chính mình sẽ có được lòng tin của người khác.",
    author: "Ngạn ngữ Do Thái",
  },
  {
    quote:
      "Thời gian miễn phí nhưng nó vô giá, bạn không thể sở hữu nó nhưng bạn có thể sử dụng nó, bạn không thể giữ nó nhưng bạn có thể tiêu nó, một khi bạn đánh mất nó bạn sẽ không bao giờ có thể lấy lại.",
    author: "Harvey MacKay",
  },
];

export function getCurrentDate(separator = ".") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${day[newDate.getUTCDay()]}, ${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
}

export function getCurrentTime() {
  let newDate = new Date();
  let seconds = newDate.getSeconds();
  let minutes = newDate.getMinutes();
  let hours = newDate.getHours();
  return `${hours} : ${minutes} : ${seconds > 10 ? seconds : 0 + seconds}`;
}
