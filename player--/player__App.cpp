/***************************************************************
 * Name:      player__App.cpp
 * Purpose:   Code for Application Class
 * Author:     ()
 * Created:   2023-02-15
 * Copyright:  ()
 * License:
 **************************************************************/

#include "player__App.h"

//(*AppHeaders
#include "player__Main.h"
#include <wx/image.h>
//*)

IMPLEMENT_APP(player__App);

bool player__App::OnInit()
{
    //(*AppInitialize
    bool wxsOK = true;
    wxInitAllImageHandlers();
    if ( wxsOK )
    {
    	player__Dialog Dlg(0);
    	SetTopWindow(&Dlg);
    	Dlg.ShowModal();
    	wxsOK = false;
    }
    //*)
    return wxsOK;

}
