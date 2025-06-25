export default function extractFirstImg(html){
    const match = html.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] :null;
}