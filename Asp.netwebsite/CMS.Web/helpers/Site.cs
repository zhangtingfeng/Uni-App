using DTcms.BLL;


public class site
{
    private static DTcms.Model.sites _global = null;

    private site() { }

    public static DTcms.Model.sites global
    {
        get
        {
            if (_global == null)
            {
                _global = new sites().GetModel(1);
            }

            return _global;
        }
    }

    public static string title(string title)
    {
        if (string.IsNullOrEmpty(title))
        {
            return "";
        }
        if (title.Length > 18)
        {
            return title.Substring(0, 18) + "...";
        }
        return title;
    }
    public static string zhaiyao(string title)
    {
        if (string.IsNullOrEmpty(title))
        {
            return "";
        }
        if (title.Length > 70)
        {
            return title.Substring(0, 70) + "...";
        }
        return title;
    }

    public static string Transferred(string Meaning)
    {             //普通字符变换成转义字符             
        Meaning = Meaning.Replace("&", "&amp;");
        Meaning = Meaning.Replace("<", "&lt;");
        Meaning = Meaning.Replace(">", "&gt;");
        Meaning = Meaning.Replace("'", "&apos;");
        Meaning = Meaning.Replace("\"", "&quot;");
        return Meaning;
    }
    public static string UnTransferred(string Meaning)
    {   //转义字符变换成普通字符             
        Meaning = Meaning.Replace("&lt;", "<");
        Meaning = Meaning.Replace("&gt;", ">");
        Meaning = Meaning.Replace("&apos;", "'");
        Meaning = Meaning.Replace("&quot;", "\"");
        Meaning = Meaning.Replace("&amp;", "&");
        return Meaning;
    }
}