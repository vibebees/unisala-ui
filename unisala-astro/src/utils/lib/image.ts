export function extractImageFromPostText( {user = false, postText= '',}: {user:boolean, postText:string}): string | null {
    const imgRegex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/i;
    const match = postText?.match(imgRegex);
    
    if (match && match[1]) {
      return match[1];
    }
    return user? 'https://avatar.iran.liara.run/public/'+postText?.length: null;
  }